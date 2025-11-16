import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Avatar,
  Rating,
  IconButton
} from '@mui/material';
import {
  Search,
  CloudUpload,
  Download,
  Verified,
  TrendingUp,
  Category,
  AttachMoney,
  Person,
  CalendarToday,
  Lock,
  Visibility,
  ShoppingCart
} from '@mui/icons-material';
import { useAppSelector } from '../hooks/redux';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Marketplace() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleUploadDataset = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/marketplace');
    } else {
      alert('Upload dataset feature - will be fully implemented');
    }
  };

  const handleCreateRequest = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/marketplace');
    } else {
      alert('Create data request feature - will be fully implemented');
    }
  };

  const handlePurchase = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      alert('Purchase feature - will be fully implemented');
    }
  };

  // Mock datasets
  const datasets = [
    {
      id: 1,
      title: 'Customer Satisfaction Survey - Retail Industry',
      description: 'Comprehensive customer feedback data from 5,000+ retail customers across multiple stores.',
      category: 'Retail',
      price: 150,
      records: 5234,
      format: 'CSV, Excel',
      rating: 4.8,
      reviews: 45,
      downloads: 245,
      seller: 'DataPro Solutions',
      verified: true,
      uploadDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Employee Engagement Survey Data',
      description: 'Anonymous employee feedback from tech companies. Includes satisfaction scores and engagement metrics.',
      category: 'HR',
      price: 120,
      records: 3567,
      format: 'CSV',
      rating: 4.7,
      reviews: 32,
      downloads: 156,
      seller: 'HR Analytics Co',
      verified: true,
      uploadDate: '2024-01-20'
    },
    {
      id: 3,
      title: 'Healthcare Patient Satisfaction Data',
      description: 'Patient feedback and satisfaction scores from multiple healthcare facilities. HIPAA compliant.',
      category: 'Healthcare',
      price: 250,
      records: 8901,
      format: 'CSV, JSON',
      rating: 4.9,
      reviews: 67,
      downloads: 98,
      seller: 'HealthData Analytics',
      verified: true,
      uploadDate: '2024-01-10'
    },
    {
      id: 4,
      title: 'E-commerce User Behavior Dataset',
      description: 'Detailed user interaction data, purchase patterns, and browsing behavior from online stores.',
      category: 'E-commerce',
      price: 180,
      records: 12456,
      format: 'CSV, Excel, JSON',
      rating: 4.6,
      reviews: 54,
      downloads: 189,
      seller: 'EcomInsights',
      verified: false,
      uploadDate: '2024-01-25'
    },
    {
      id: 5,
      title: 'Financial Services Customer Feedback',
      description: 'Banking and financial services customer satisfaction survey results with demographic data.',
      category: 'Finance',
      price: 200,
      records: 6789,
      format: 'Excel',
      rating: 4.5,
      reviews: 41,
      downloads: 134,
      seller: 'FinData Pro',
      verified: true,
      uploadDate: '2024-01-18'
    },
    {
      id: 6,
      title: 'Education Sector Student Feedback',
      description: 'Student satisfaction surveys from universities and colleges. Covers teaching quality and facilities.',
      category: 'Education',
      price: 95,
      records: 4123,
      format: 'CSV',
      rating: 4.4,
      reviews: 28,
      downloads: 87,
      seller: 'EduMetrics',
      verified: false,
      uploadDate: '2024-01-22'
    }
  ];

  // Mock data requests
  const dataRequests = [
    {
      id: 1,
      title: 'Need Restaurant Customer Feedback Data',
      description: 'Looking for customer satisfaction data from restaurants in major cities. Need at least 2000 responses.',
      category: 'Food & Beverage',
      budget: 300,
      deadline: '2024-03-15',
      requester: 'Restaurant Analytics Inc',
      offers: 12,
      status: 'open'
    },
    {
      id: 2,
      title: 'Tech Product User Reviews Dataset',
      description: 'Seeking comprehensive user reviews and ratings for consumer electronics and tech products.',
      category: 'Technology',
      budget: 450,
      deadline: '2024-03-20',
      requester: 'TechReview Platform',
      offers: 8,
      status: 'open'
    },
    {
      id: 3,
      title: 'Travel Industry Customer Preferences',
      description: 'Need data on customer preferences for hotels, flights, and vacation packages. Minimum 3000 records.',
      category: 'Travel',
      budget: 500,
      deadline: '2024-03-25',
      requester: 'Travel Insights Co',
      offers: 15,
      status: 'open'
    },
    {
      id: 4,
      title: 'Fitness App Usage Analytics',
      description: 'Looking for user behavior data from fitness and wellness apps. Need engagement metrics.',
      category: 'Health & Wellness',
      budget: 280,
      deadline: '2024-03-18',
      requester: 'FitTech Research',
      offers: 6,
      status: 'open'
    }
  ];

  const categories = ['all', 'Retail', 'Healthcare', 'Finance', 'Technology', 'HR', 'Education', 'E-commerce'];

  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || dataset.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ bgcolor: '#FAFAFA', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom fontWeight="bold" color="text.primary">
            Data Marketplace
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Buy and sell verified datasets. Browse, preview, and purchase quality data for your projects.
          </Typography>
        </Box>

        {/* Search and Filters */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search datasets or data requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ bgcolor: 'white' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth sx={{ bgcolor: 'white' }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Category"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<CloudUpload />}
                onClick={handleUploadDataset}
                sx={{ height: 56 }}
              >
                {!isAuthenticated ? 'Login to Upload' : 'Upload Dataset'}
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label={`Datasets (${datasets.length})`} />
            <Tab label={`Data Requests (${dataRequests.length})`} />
          </Tabs>
        </Box>

        {/* Tab 1: Datasets */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {filteredDatasets.map((dataset) => (
              <Grid item xs={12} md={6} lg={4} key={dataset.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #E0E0E0',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(201, 34, 88, 0.15)',
                      borderColor: 'primary.main'
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* Header with verified badge */}
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip
                        label={dataset.category}
                        size="small"
                        sx={{ bgcolor: '#F5F5F5', color: 'text.primary' }}
                      />
                      {dataset.verified && (
                        <Chip
                          icon={<Verified />}
                          label="Verified"
                          size="small"
                          color="primary"
                        />
                      )}
                    </Stack>

                    {/* Title */}
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {dataset.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, minHeight: 60 }}
                    >
                      {dataset.description}
                    </Typography>

                    {/* Stats */}
                    <Stack spacing={1} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Download fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {dataset.records.toLocaleString()} records • {dataset.format}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating value={dataset.rating} readOnly size="small" precision={0.1} />
                        <Typography variant="body2" color="text.secondary">
                          {dataset.rating} ({dataset.reviews} reviews)
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TrendingUp fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {dataset.downloads} downloads
                        </Typography>
                      </Box>
                    </Stack>

                    {/* Seller info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main', fontSize: 12 }}>
                        {dataset.seller[0]}
                      </Avatar>
                      <Typography variant="caption" color="text.secondary">
                        {dataset.seller}
                      </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {/* Price */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h5" fontWeight="bold" color="primary.main">
                        ${dataset.price}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {dataset.uploadDate}
                      </Typography>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Visibility />}
                      sx={{ mr: 1 }}
                    >
                      Preview
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={!isAuthenticated ? <Lock /> : <ShoppingCart />}
                      onClick={handlePurchase}
                    >
                      {!isAuthenticated ? 'Login' : 'Purchase'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {filteredDatasets.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No datasets found matching your criteria
              </Typography>
            </Box>
          )}
        </TabPanel>

        {/* Tab 2: Data Requests */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<AttachMoney />}
              onClick={handleCreateRequest}
              size="large"
            >
              {!isAuthenticated ? 'Login to Create Request' : 'Create Data Request'}
            </Button>
          </Box>

          <Grid container spacing={3}>
            {dataRequests.map((request) => (
              <Grid item xs={12} md={6} key={request.id}>
                <Card
                  sx={{
                    border: '1px solid #E0E0E0',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(201, 34, 88, 0.15)',
                      borderColor: 'primary.main'
                    }
                  }}
                >
                  <CardContent>
                    {/* Header */}
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip
                        label={request.category}
                        size="small"
                        sx={{ bgcolor: '#F5F5F5', color: 'text.primary' }}
                      />
                      <Chip
                        label={request.status.toUpperCase()}
                        size="small"
                        color="success"
                      />
                    </Stack>

                    {/* Title */}
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {request.title}
                    </Typography>

                    {/* Description */}
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {request.description}
                    </Typography>

                    {/* Details Grid */}
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AttachMoney fontSize="small" color="action" />
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Budget
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" color="primary.main">
                              ${request.budget}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarToday fontSize="small" color="action" />
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Deadline
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {request.deadline}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Person fontSize="small" color="action" />
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Requester
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {request.requester}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <TrendingUp fontSize="small" color="action" />
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Offers
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" color="success.main">
                              {request.offers} offers
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>

                    <Divider sx={{ mb: 2 }} />

                    {/* Actions */}
                    <Stack direction="row" spacing={2}>
                      <Button
                        fullWidth
                        variant="outlined"
                      >
                        View Details
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={!isAuthenticated ? <Lock /> : undefined}
                        onClick={() => !isAuthenticated ? navigate('/login') : alert('Submit offer - will be implemented')}
                      >
                        {!isAuthenticated ? 'Login to Offer' : 'Submit Offer'}
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Container>
    </Box>
  );
}
