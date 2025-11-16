import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  LinearProgress,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  PieChart,
  TrendingUp,
  ShowChart,
  Assessment,
  CloudUpload,
  Lock,
  CheckCircle
} from '@mui/icons-material';
import { useAppSelector } from '../hooks/redux';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Analytics() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const statisticalTests = [
    {
      name: 'Descriptive Statistics',
      description: 'Mean, median, mode, standard deviation, variance',
      icon: <Assessment color="primary" />,
      available: true
    },
    {
      name: 'Correlation Analysis',
      description: 'Pearson, Spearman, Kendall correlation coefficients',
      icon: <ShowChart color="primary" />,
      available: true
    },
    {
      name: 'Linear Regression',
      description: 'Simple and multiple linear regression analysis',
      icon: <TrendingUp color="primary" />,
      available: true
    },
    {
      name: 'T-Test',
      description: 'Independent and paired sample t-tests',
      icon: <BarChart color="primary" />,
      available: true
    },
    {
      name: 'Chi-Square Test',
      description: 'Test of independence for categorical data',
      icon: <PieChart color="primary" />,
      available: true
    },
    {
      name: 'ANOVA',
      description: 'One-way analysis of variance',
      icon: <Assessment color="primary" />,
      available: true
    }
  ];

  const sampleAnalytics = [
    { metric: 'Total Forms', value: '1,234', change: '+12%', color: 'success' },
    { metric: 'Total Responses', value: '45,678', change: '+23%', color: 'success' },
    { metric: 'Active Contributors', value: '3,456', change: '+8%', color: 'success' },
    { metric: 'Datasets Available', value: '567', change: '+15%', color: 'success' }
  ];

  const trendingDatasets = [
    { name: 'Customer Satisfaction Survey - Retail', downloads: 245, price: 150, rating: 4.8 },
    { name: 'Market Research - Tech Industry', downloads: 189, price: 200, rating: 4.9 },
    { name: 'Employee Feedback Collection', downloads: 156, price: 120, rating: 4.7 },
    { name: 'Product Usage Analytics', downloads: 134, price: 180, rating: 4.6 },
    { name: 'Healthcare Patient Data', downloads: 98, price: 250, rating: 4.9 }
  ];

  const handleAnalyzeData = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/analytics');
    } else {
      alert('Data analysis feature - will be fully implemented');
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Analytics & Insights
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Powerful statistical analysis tools and marketplace analytics at your fingertips
        </Typography>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {sampleAnalytics.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {stat.metric}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Chip
                  label={stat.change}
                  size="small"
                  color={stat.color as any}
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Statistical Tools" />
          <Tab label="Marketplace Analytics" />
          <Tab label="Data Visualization" />
        </Tabs>
      </Paper>

      {/* Tab 1: Statistical Tools */}
      <TabPanel value={tabValue} index={0}>
        {!isAuthenticated && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2" fontWeight="bold" gutterBottom>
              Advanced analytics requires authentication
            </Typography>
            <Typography variant="body2">
              Sign up to access our powerful statistical analysis tools and AI-powered insights.
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate('/register')}
              sx={{ mt: 2 }}
            >
              Get Started Free
            </Button>
          </Alert>
        )}

        <Grid container spacing={3}>
          {statisticalTests.map((test, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {test.icon}
                    <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                      {test.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {test.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Chip
                      label="Available"
                      size="small"
                      color="success"
                      icon={<CheckCircle />}
                    />
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={handleAnalyzeData}
                      startIcon={!isAuthenticated ? <Lock /> : undefined}
                    >
                      {!isAuthenticated ? 'Login to Use' : 'Use Tool'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center', p: 4, bgcolor: 'grey.50', borderRadius: 2 }}>
          <CloudUpload sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Upload Your Data
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Upload CSV or Excel files and get instant statistical analysis
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleAnalyzeData}
            startIcon={<CloudUpload />}
          >
            {!isAuthenticated ? 'Login to Upload' : 'Upload Dataset'}
          </Button>
        </Box>
      </TabPanel>

      {/* Tab 2: Marketplace Analytics */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Trending Datasets
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Most popular datasets in the marketplace this month
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Dataset Name</strong></TableCell>
                <TableCell align="right"><strong>Downloads</strong></TableCell>
                <TableCell align="right"><strong>Price</strong></TableCell>
                <TableCell align="right"><strong>Rating</strong></TableCell>
                <TableCell align="right"><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trendingDatasets.map((dataset, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {dataset.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Chip label={dataset.downloads} size="small" color="primary" />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="success.main" fontWeight="bold">
                      ${dataset.price}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <Typography variant="body2" sx={{ mr: 0.5 }}>
                        ⭐
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {dataset.rating}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate('/marketplace')}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Category Distribution
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Healthcare</Typography>
                      <Typography variant="body2" fontWeight="bold">35%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={35} />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Retail</Typography>
                      <Typography variant="body2" fontWeight="bold">28%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={28} />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Technology</Typography>
                      <Typography variant="body2" fontWeight="bold">22%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={22} />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Finance</Typography>
                      <Typography variant="body2" fontWeight="bold">15%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={15} />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Price Range Analysis
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">$0 - $100</Typography>
                      <Typography variant="body2" fontWeight="bold">120 datasets</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={45} color="success" />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">$100 - $200</Typography>
                      <Typography variant="body2" fontWeight="bold">85 datasets</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={32} color="info" />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">$200 - $500</Typography>
                      <Typography variant="body2" fontWeight="bold">42 datasets</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={16} color="warning" />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">$500+</Typography>
                      <Typography variant="body2" fontWeight="bold">18 datasets</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={7} color="error" />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Tab 3: Data Visualization */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Available Chart Types
                </Typography>
                <Stack spacing={2}>
                  {[
                    'Bar Charts',
                    'Pie Charts',
                    'Line Charts',
                    'Scatter Plots',
                    'Histograms',
                    'Box Plots',
                    'Heatmaps',
                    'Area Charts'
                  ].map((chart, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        bgcolor: 'grey.50',
                        borderRadius: 1
                      }}
                    >
                      <Typography variant="body2">{chart}</Typography>
                      <Chip label="Available" size="small" color="success" />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Export Options
                </Typography>
                <Stack spacing={2}>
                  {[
                    { format: 'PDF Report', description: 'Professional formatted report' },
                    { format: 'Excel Spreadsheet', description: 'Raw data with calculations' },
                    { format: 'CSV File', description: 'Comma-separated values' },
                    { format: 'PNG Images', description: 'High-resolution charts' },
                    { format: 'JSON Data', description: 'Machine-readable format' }
                  ].map((option, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        bgcolor: 'grey.50',
                        borderRadius: 1
                      }}
                    >
                      <Typography variant="body2" fontWeight="bold">
                        {option.format}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.description}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center', p: 4, bgcolor: 'primary.main', color: 'white', borderRadius: 2 }}>
          <Assessment sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h5" gutterBottom fontWeight="bold">
            AI-Powered Insights
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Get automated insights and recommendations from your data using AI
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleAnalyzeData}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            {!isAuthenticated ? 'Login to Access' : 'Try AI Analysis'}
          </Button>
        </Box>
      </TabPanel>
    </Container>
  );
}
