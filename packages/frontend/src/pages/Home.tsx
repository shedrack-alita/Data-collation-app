import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Assessment,
  CloudUpload,
  People,
  Analytics,
  CheckCircle,
  TrendingUp,
  BarChart,
  PieChart,
  ShowChart,
  Storage
} from '@mui/icons-material';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <CloudUpload sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Create Custom Forms',
      description: 'Build professional data collection forms with our intuitive drag-and-drop builder. Add logic, validation, and multimedia fields.'
    },
    {
      icon: <People sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Crowdsourced Data Collection',
      description: 'Connect with contributors worldwide. Get verified, quality responses from our community of data providers.'
    },
    {
      icon: <Assessment sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Data Marketplace',
      description: 'Buy and sell datasets. Request specific data or browse verified datasets from various industries.'
    },
    {
      icon: <Analytics sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Advanced Analytics',
      description: 'Analyze your data with powerful statistical tools. Generate reports, visualizations, and insights automatically.'
    },
    {
      icon: <CheckCircle sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Quality Verification',
      description: 'Built-in fraud detection and verification system ensures data accuracy and reliability.'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Earn Money',
      description: 'Fill surveys, verify data, or sell datasets. Flexible earning opportunities for everyone.'
    }
  ];

  const benefits = [
    'No need to hire external data analysts',
    'Affordable and fast data collection',
    'Real-time responses and analytics',
    'Secure payment processing',
    'Quality verified datasets',
    'AI-powered insights'
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 12,
          mb: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom fontWeight="bold">
                Data Collection & Analytics Platform
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Collect, analyze, and monetize data with the all-in-one platform for students,
                researchers, and businesses.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' },
                    fontWeight: 'bold',
                    px: 4
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/forms')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    },
                    fontWeight: 'bold',
                    px: 4
                  }}
                >
                  Browse Forms
                </Button>
              </Stack>
            </Grid>

            {/* Hero Illustration */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 300, md: 400 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Main visual - Data collection illustration */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {/* Background circles */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: 300,
                      height: 300,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      animation: 'pulse 3s ease-in-out infinite'
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      width: 240,
                      height: 240,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255,255,255,0.15)',
                      animation: 'pulse 3s ease-in-out infinite 0.5s'
                    }}
                  />

                  {/* Central data hub */}
                  <Paper
                    elevation={8}
                    sx={{
                      position: 'relative',
                      zIndex: 2,
                      width: 180,
                      height: 180,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'white',
                      border: '4px solid rgba(102, 126, 234, 0.3)'
                    }}
                  >
                    <Storage sx={{ fontSize: 80, color: 'primary.main' }} />
                  </Paper>

                  {/* Floating data cards */}
                  <Paper
                    elevation={4}
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: 40,
                      p: 2,
                      bgcolor: 'white',
                      borderRadius: 2,
                      animation: 'float 4s ease-in-out infinite',
                      minWidth: 100
                    }}
                  >
                    <BarChart sx={{ fontSize: 32, color: 'primary.main' }} />
                    <Typography variant="caption" display="block" color="text.secondary">
                      Analytics
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={4}
                    sx={{
                      position: 'absolute',
                      top: 120,
                      left: 20,
                      p: 2,
                      bgcolor: 'white',
                      borderRadius: 2,
                      animation: 'float 4s ease-in-out infinite 1s',
                      minWidth: 100
                    }}
                  >
                    <PieChart sx={{ fontSize: 32, color: 'secondary.main' }} />
                    <Typography variant="caption" display="block" color="text.secondary">
                      Reports
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={4}
                    sx={{
                      position: 'absolute',
                      bottom: 60,
                      right: 60,
                      p: 2,
                      bgcolor: 'white',
                      borderRadius: 2,
                      animation: 'float 4s ease-in-out infinite 2s',
                      minWidth: 100
                    }}
                  >
                    <ShowChart sx={{ fontSize: 32, color: 'success.main' }} />
                    <Typography variant="caption" display="block" color="text.secondary">
                      Insights
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={4}
                    sx={{
                      position: 'absolute',
                      bottom: 40,
                      left: 60,
                      p: 2,
                      bgcolor: 'white',
                      borderRadius: 2,
                      animation: 'float 4s ease-in-out infinite 3s',
                      minWidth: 100
                    }}
                  >
                    <People sx={{ fontSize: 32, color: 'warning.main' }} />
                    <Typography variant="caption" display="block" color="text.secondary">
                      Contributors
                    </Typography>
                  </Paper>
                </Box>

                {/* Statistics overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -30,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '90%',
                    zIndex: 3
                  }}
                >
                  <Paper
                    elevation={6}
                    sx={{
                      p: 3,
                      bgcolor: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="h4" fontWeight="bold" color="primary">
                          10,000+
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Active Users
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h4" fontWeight="bold" color="secondary">
                          50,000+
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Responses
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* CSS Animations */}
        <style>
          {`
            @keyframes pulse {
              0%, 100% {
                transform: scale(1);
                opacity: 0.3;
              }
              50% {
                transform: scale(1.05);
                opacity: 0.5;
              }
            }

            @keyframes float {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-15px);
              }
            }
          `}
        </style>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
          Everything You Need
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          A comprehensive platform for all your data needs
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 } }}>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  {feature.icon}
                  <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8, mb: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom fontWeight="bold">
                Why Choose Our Platform?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We solve the challenges of traditional data collection and analysis,
                making it accessible, affordable, and efficient for everyone.
              </Typography>
              <Stack spacing={2}>
                {benefits.map((benefit, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ color: 'success.main', mr: 2 }} />
                    <Typography variant="body1">{benefit}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 4, bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                  Start Earning Today
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                  Join thousands of contributors earning money by:
                </Typography>
                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Typography variant="body1">• Filling surveys and forms</Typography>
                  <Typography variant="body1">• Verifying data submissions</Typography>
                  <Typography variant="body1">• Selling valuable datasets</Typography>
                </Stack>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => navigate('/register')}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' },
                    fontWeight: 'bold'
                  }}
                >
                  Join as Contributor
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ mb: 8, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Ready to Get Started?
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Create your free account and start collecting data in minutes
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ px: 6 }}
          >
            Sign Up Free
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/marketplace')}
            sx={{ px: 6 }}
          >
            Explore Marketplace
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
