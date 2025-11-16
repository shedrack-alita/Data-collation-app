import { Container, Typography, Button, Box, Grid, Card, CardContent, Chip, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add, Visibility, CheckCircle } from '@mui/icons-material';
import { useAppSelector } from '../../hooks/redux';

export default function FormList() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Mock data - will be replaced with API call
  const mockForms = [
    {
      id: '1',
      title: 'Customer Satisfaction Survey',
      description: 'Help us improve our services',
      responses: 145,
      status: 'published',
      paymentPerResponse: 5.0
    },
    {
      id: '2',
      title: 'Market Research Survey',
      description: 'Understanding consumer behavior',
      responses: 89,
      status: 'published',
      paymentPerResponse: 7.5
    },
    {
      id: '3',
      title: 'Product Feedback Form',
      description: 'Share your experience with our product',
      responses: 234,
      status: 'published',
      paymentPerResponse: 3.0
    }
  ];

  const handleCreateForm = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/forms/new');
    } else {
      navigate('/forms/new');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <div>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            {isAuthenticated ? 'My Surveys' : 'Browse Surveys'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {isAuthenticated
              ? 'Create and manage your data collection forms'
              : 'Explore available forms and start earning by contributing'}
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateForm}
          size="large"
        >
          Create Survey
        </Button>
      </Box>

      {!isAuthenticated && (
        <Box
          sx={{
            bgcolor: 'info.lighter',
            border: 1,
            borderColor: 'info.main',
            borderRadius: 2,
            p: 3,
            mb: 4
          }}
        >
          <Typography variant="body1" gutterBottom fontWeight="bold">
            Want to fill forms and earn money?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Sign up as a contributor to access available forms and start earning.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/register')}
            size="small"
          >
            Sign Up Now
          </Button>
        </Box>
      )}

      <Grid container spacing={3}>
        {mockForms.map((form) => (
          <Grid item xs={12} md={6} lg={4} key={form.id}>
            <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 }, cursor: 'pointer' }}>
              <CardContent onClick={() => navigate(`/forms/${form.id}`)}>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip
                    label={form.status}
                    size="small"
                    color="success"
                    icon={<CheckCircle />}
                  />
                  <Chip
                    label={`$${form.paymentPerResponse} per response`}
                    size="small"
                    color="primary"
                  />
                </Stack>

                <Typography variant="h6" gutterBottom fontWeight="bold">
                  {form.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {form.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Visibility fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {form.responses} responses
                    </Typography>
                  </Box>
                  <Button size="small" variant="outlined">
                    View Form
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {mockForms.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No forms available yet
          </Typography>
          <Button
            variant="contained"
            onClick={handleCreateForm}
            sx={{ mt: 2 }}
          >
            Create Your First Form
          </Button>
        </Box>
      )}
    </Container>
  );
}
