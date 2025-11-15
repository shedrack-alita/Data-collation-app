from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import pandas as pd
import numpy as np
from scipy import stats
from sklearn.linear_model import LinearRegression
from sklearn.cluster import KMeans
import json
import io
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Data Analytics Microservice",
    description="Advanced statistical analysis and data visualization service",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response Models
class DescriptiveStatsRequest(BaseModel):
    data: List[Dict[str, Any]]
    columns: Optional[List[str]] = None

class CorrelationRequest(BaseModel):
    data: List[Dict[str, Any]]
    method: str = "pearson"  # pearson, spearman, kendall

class RegressionRequest(BaseModel):
    data: List[Dict[str, Any]]
    x_columns: List[str]
    y_column: str

class TTestRequest(BaseModel):
    sample1: List[float]
    sample2: List[float]
    paired: bool = False

class ChiSquareRequest(BaseModel):
    observed: List[List[int]]

class ClusteringRequest(BaseModel):
    data: List[Dict[str, Any]]
    columns: List[str]
    n_clusters: int = 3

@app.get("/")
async def root():
    return {
        "service": "Data Analytics Microservice",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/stats/descriptive")
async def descriptive_statistics(request: DescriptiveStatsRequest):
    """
    Calculate descriptive statistics for the provided data
    """
    try:
        df = pd.DataFrame(request.data)

        if request.columns:
            df = df[request.columns]

        # Select only numeric columns
        numeric_df = df.select_dtypes(include=[np.number])

        if numeric_df.empty:
            raise HTTPException(status_code=400, detail="No numeric columns found")

        stats_dict = {
            "count": numeric_df.count().to_dict(),
            "mean": numeric_df.mean().to_dict(),
            "std": numeric_df.std().to_dict(),
            "min": numeric_df.min().to_dict(),
            "25%": numeric_df.quantile(0.25).to_dict(),
            "50%": numeric_df.quantile(0.50).to_dict(),
            "75%": numeric_df.quantile(0.75).to_dict(),
            "max": numeric_df.max().to_dict(),
            "variance": numeric_df.var().to_dict(),
            "skewness": numeric_df.skew().to_dict(),
            "kurtosis": numeric_df.kurtosis().to_dict()
        }

        return {
            "success": True,
            "statistics": stats_dict
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/stats/correlation")
async def correlation_analysis(request: CorrelationRequest):
    """
    Calculate correlation matrix
    """
    try:
        df = pd.DataFrame(request.data)
        numeric_df = df.select_dtypes(include=[np.number])

        if numeric_df.empty:
            raise HTTPException(status_code=400, detail="No numeric columns found")

        corr_matrix = numeric_df.corr(method=request.method)

        return {
            "success": True,
            "correlation_matrix": corr_matrix.to_dict(),
            "method": request.method
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/stats/regression")
async def linear_regression_analysis(request: RegressionRequest):
    """
    Perform linear regression analysis
    """
    try:
        df = pd.DataFrame(request.data)

        X = df[request.x_columns].values
        y = df[request.y_column].values

        # Fit model
        model = LinearRegression()
        model.fit(X, y)

        # Predictions
        y_pred = model.predict(X)

        # Calculate metrics
        r_squared = model.score(X, y)
        mse = np.mean((y - y_pred) ** 2)
        rmse = np.sqrt(mse)

        return {
            "success": True,
            "coefficients": {
                col: float(coef)
                for col, coef in zip(request.x_columns, model.coef_)
            },
            "intercept": float(model.intercept_),
            "r_squared": float(r_squared),
            "mse": float(mse),
            "rmse": float(rmse)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/stats/t-test")
async def t_test_analysis(request: TTestRequest):
    """
    Perform t-test
    """
    try:
        if request.paired:
            t_stat, p_value = stats.ttest_rel(request.sample1, request.sample2)
            test_type = "Paired t-test"
        else:
            t_stat, p_value = stats.ttest_ind(request.sample1, request.sample2)
            test_type = "Independent t-test"

        return {
            "success": True,
            "test_type": test_type,
            "t_statistic": float(t_stat),
            "p_value": float(p_value),
            "significant": p_value < 0.05
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/stats/chi-square")
async def chi_square_test(request: ChiSquareRequest):
    """
    Perform chi-square test
    """
    try:
        chi2, p_value, dof, expected = stats.chi2_contingency(request.observed)

        return {
            "success": True,
            "chi2_statistic": float(chi2),
            "p_value": float(p_value),
            "degrees_of_freedom": int(dof),
            "expected_frequencies": expected.tolist(),
            "significant": p_value < 0.05
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/stats/anova")
async def anova_analysis(request: Dict[str, List[float]]):
    """
    Perform one-way ANOVA
    """
    try:
        groups = list(request.values())
        f_stat, p_value = stats.f_oneway(*groups)

        return {
            "success": True,
            "f_statistic": float(f_stat),
            "p_value": float(p_value),
            "significant": p_value < 0.05
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ml/clustering")
async def clustering_analysis(request: ClusteringRequest):
    """
    Perform K-means clustering
    """
    try:
        df = pd.DataFrame(request.data)
        X = df[request.columns].values

        # Fit K-means
        kmeans = KMeans(n_clusters=request.n_clusters, random_state=42)
        clusters = kmeans.fit_predict(X)

        return {
            "success": True,
            "clusters": clusters.tolist(),
            "centroids": kmeans.cluster_centers_.tolist(),
            "inertia": float(kmeans.inertia_)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/upload/analyze")
async def analyze_uploaded_file(file: UploadFile = File(...)):
    """
    Analyze uploaded CSV or Excel file
    """
    try:
        contents = await file.read()

        if file.filename.endswith('.csv'):
            df = pd.read_csv(io.BytesIO(contents))
        elif file.filename.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(io.BytesIO(contents))
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")

        # Basic info
        info = {
            "rows": len(df),
            "columns": len(df.columns),
            "column_names": df.columns.tolist(),
            "dtypes": df.dtypes.astype(str).to_dict(),
            "missing_values": df.isnull().sum().to_dict(),
            "sample_data": df.head(5).to_dict(orient='records')
        }

        # Descriptive stats for numeric columns
        numeric_df = df.select_dtypes(include=[np.number])
        if not numeric_df.empty:
            info["descriptive_stats"] = numeric_df.describe().to_dict()

        return {
            "success": True,
            "file_info": info
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)
