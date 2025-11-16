import { Container, Typography, Button, Box, Paper, Alert, Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Lock, AttachMoney } from '@mui/icons-material';
import { useAppSelector } from '../../hooks/redux';

export default function FormView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Mock form data - will be replaced with API call
  const mockForm = {
    id,
    title: 'Customer Satisfaction Survey',
    description: 'Help us improve our services by sharing your feedback',
    paymentPerResponse: 5.0,
    estimatedTime: '5-10 minutes',
    responses: 145,
    questions: 12
  };

  const handleFillForm = () => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/forms/${id}`);
    } else {
      // Navigate to form submission page
      alert('Form submission page will be implemented');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4, border: 1, borderColor: 'divider' }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          {mockForm.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {mockForm.description}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Payment
            </Typography>
            <Typography variant="h6" color="success.main" fontWeight="bold">
              ${mockForm.paymentPerResponse}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Estimated Time
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {mockForm.estimatedTime}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Questions
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {mockForm.questions}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Responses
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {mockForm.responses}
            </Typography>
          </Box>
        </Box>

        {!isAuthenticated && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2" fontWeight="bold" gutterBottom>
              Login required to fill this form
            </Typography>
            <Typography variant="body2">
              You need to create an account to contribute and earn money. It's quick and free!
            </Typography>
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleFillForm}
            startIcon={!isAuthenticated ? <Lock /> : <AttachMoney />}
          >
            {!isAuthenticated ? 'Login to Fill Form' : 'Fill Form & Earn $' + mockForm.paymentPerResponse}
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            About this form
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            This form collects customer feedback to help improve our services. Your responses will be
            anonymous and used for research purposes only.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            You will receive payment after your submission is verified. Verification typically takes
            24-48 hours.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
