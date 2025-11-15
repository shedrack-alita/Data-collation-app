# API Documentation

## Base URLs

- **Backend API:** `http://localhost:5000/api`
- **Analytics API:** `http://localhost:8001/api`

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Tokens are obtained from the `/auth/login` or `/auth/register` endpoints.

---

## Authentication Endpoints

### Register User

**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "roles": ["contributor"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "roles": ["contributor"],
      "status": "pending"
    },
    "token": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

### Login

**POST** `/auth/login`

Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { /* user object */ },
    "token": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

### Get Current User

**GET** `/auth/me`

Get authenticated user's profile.

**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["contributor"],
    "performanceScore": 85.5,
    "totalEarnings": 150.00
  }
}
```

### Update Profile

**PUT** `/auth/profile`

Update user profile information.

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+1234567890",
  "profileImage": "https://example.com/image.jpg"
}
```

### Refresh Token

**POST** `/auth/refresh`

Get new access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "refresh_token"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token",
    "refreshToken": "new_refresh_token"
  }
}
```

### Change Password

**POST** `/auth/change-password`

Change user password.

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

---

## Forms Endpoints (To be implemented)

### Create Form

**POST** `/forms`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "title": "Customer Satisfaction Survey",
  "description": "Help us improve our service",
  "sections": [
    {
      "id": "section-1",
      "title": "Personal Information",
      "fields": [
        {
          "id": "field-1",
          "type": "text",
          "label": "Full Name",
          "required": true
        },
        {
          "id": "field-2",
          "type": "email",
          "label": "Email Address",
          "required": true
        }
      ]
    }
  ],
  "settings": {
    "anonymous": false,
    "oneResponsePerUser": true,
    "responseLimit": 100,
    "paymentPerResponse": 5.00,
    "requireVerification": true
  }
}
```

### Get Forms

**GET** `/forms?status=published&page=1&limit=10`

### Get Single Form

**GET** `/forms/:id`

### Update Form

**PUT** `/forms/:id`

### Delete Form

**DELETE** `/forms/:id`

### Publish Form

**POST** `/forms/:id/publish`

---

## Responses Endpoints (To be implemented)

### Submit Response

**POST** `/responses`

**Request Body:**
```json
{
  "formId": "form-uuid",
  "answers": [
    {
      "fieldId": "field-1",
      "value": "John Doe"
    },
    {
      "fieldId": "field-2",
      "value": "john@example.com"
    }
  ],
  "metadata": {
    "timeSpentMinutes": 5,
    "location": {
      "latitude": 40.7128,
      "longitude": -74.0060
    }
  }
}
```

### Get Responses

**GET** `/responses/:formId?status=verified&page=1`

### Verify Response

**POST** `/responses/:id/verify`

**Headers:** `Authorization: Bearer {token}` (Verifier role required)

**Request Body:**
```json
{
  "status": "verified",
  "notes": "Response looks legitimate"
}
```

### Export Responses

**GET** `/responses/export/:formId?format=csv`

Formats: `csv`, `excel`, `json`

---

## Marketplace Endpoints (To be implemented)

### List Datasets

**GET** `/marketplace/datasets?category=healthcare&page=1`

### Upload Dataset

**POST** `/marketplace/datasets`

**Headers:** `Authorization: Bearer {token}`

**Form Data:**
- `file`: File upload
- `title`: string
- `description`: string
- `category`: string
- `price`: number

### Purchase Dataset

**POST** `/marketplace/datasets/:id/purchase`

### Create Data Request

**POST** `/marketplace/requests`

**Request Body:**
```json
{
  "title": "Need customer satisfaction data",
  "description": "Looking for survey data from retail customers",
  "category": "retail",
  "budget": 500,
  "deadline": "2024-12-31",
  "requirements": {
    "format": ["csv", "excel"],
    "minRecords": 1000,
    "columns": ["age", "satisfaction_score", "purchase_frequency"]
  }
}
```

---

## Analytics Endpoints

### Descriptive Statistics

**POST** `/stats/descriptive`

**Request Body:**
```json
{
  "data": [
    {"age": 25, "salary": 50000},
    {"age": 30, "salary": 60000},
    {"age": 35, "salary": 70000}
  ],
  "columns": ["age", "salary"]
}
```

**Response:**
```json
{
  "success": true,
  "statistics": {
    "count": {"age": 3, "salary": 3},
    "mean": {"age": 30, "salary": 60000},
    "std": {"age": 5, "salary": 10000},
    "min": {"age": 25, "salary": 50000},
    "max": {"age": 35, "salary": 70000}
  }
}
```

### Correlation Analysis

**POST** `/stats/correlation`

**Request Body:**
```json
{
  "data": [
    {"age": 25, "salary": 50000, "experience": 2},
    {"age": 30, "salary": 60000, "experience": 5},
    {"age": 35, "salary": 70000, "experience": 10}
  ],
  "method": "pearson"
}
```

### Linear Regression

**POST** `/stats/regression`

**Request Body:**
```json
{
  "data": [
    {"experience": 2, "salary": 50000},
    {"experience": 5, "salary": 60000},
    {"experience": 10, "salary": 70000}
  ],
  "x_columns": ["experience"],
  "y_column": "salary"
}
```

**Response:**
```json
{
  "success": true,
  "coefficients": {"experience": 2000},
  "intercept": 46000,
  "r_squared": 0.95,
  "mse": 1000000,
  "rmse": 1000
}
```

### T-Test

**POST** `/stats/t-test`

**Request Body:**
```json
{
  "sample1": [23, 25, 27, 29, 31],
  "sample2": [33, 35, 37, 39, 41],
  "paired": false
}
```

### Chi-Square Test

**POST** `/stats/chi-square`

**Request Body:**
```json
{
  "observed": [
    [10, 20, 30],
    [15, 25, 35]
  ]
}
```

### ANOVA

**POST** `/stats/anova`

**Request Body:**
```json
{
  "group1": [23, 25, 27],
  "group2": [33, 35, 37],
  "group3": [43, 45, 47]
}
```

### K-Means Clustering

**POST** `/ml/clustering`

**Request Body:**
```json
{
  "data": [
    {"feature1": 1.0, "feature2": 2.0},
    {"feature1": 1.5, "feature2": 1.8},
    {"feature1": 5.0, "feature2": 8.0}
  ],
  "columns": ["feature1", "feature2"],
  "n_clusters": 2
}
```

### Upload and Analyze File

**POST** `/upload/analyze`

**Form Data:**
- `file`: CSV or Excel file

**Response:**
```json
{
  "success": true,
  "file_info": {
    "rows": 1000,
    "columns": 5,
    "column_names": ["age", "salary", "experience", "department", "rating"],
    "dtypes": {
      "age": "int64",
      "salary": "float64"
    },
    "missing_values": {
      "age": 0,
      "salary": 5
    },
    "descriptive_stats": { /* statistics */ }
  }
}
```

---

## Wallet Endpoints (To be implemented)

### Get Wallet Balance

**GET** `/wallet`

**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "success": true,
  "data": {
    "balance": 150.00,
    "pendingBalance": 25.00,
    "currency": "USD"
  }
}
```

### Get Transactions

**GET** `/wallet/transactions?page=1&limit=20`

### Withdraw Funds

**POST** `/wallet/withdraw`

**Request Body:**
```json
{
  "amount": 100.00,
  "method": "bank_transfer",
  "accountDetails": {
    "accountNumber": "1234567890",
    "bankName": "Example Bank"
  }
}
```

---

## Admin Endpoints (To be implemented)

### Dashboard Statistics

**GET** `/admin/dashboard`

**Headers:** `Authorization: Bearer {token}` (Admin role required)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1500,
    "activeForms": 250,
    "totalResponses": 10000,
    "totalRevenue": 50000,
    "pendingVerifications": 120
  }
}
```

### List All Users

**GET** `/admin/users?page=1&role=contributor`

### Suspend User

**PUT** `/admin/users/:id/suspend`

### View All Transactions

**GET** `/admin/transactions?page=1`

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

Default rate limits:
- 100 requests per 15 minutes per IP
- Authenticated endpoints: Higher limits

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## Pagination

List endpoints support pagination:

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

**Response Format:**
```json
{
  "success": true,
  "data": [ /* items */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

---

## WebSocket Events (To be implemented)

Connect to: `ws://localhost:5000`

**Events:**
- `form-response` - New response submitted
- `payment-received` - Payment credited to wallet
- `verification-complete` - Response verified

---

For interactive API documentation, visit:
- **Analytics API:** http://localhost:8001/docs
