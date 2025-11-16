import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { register as registerAction, clearError } from '../../store/slices/authSlice';

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'creator' | 'contributor';
}

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.auth);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>();

  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    const { confirmPassword, role, ...registerData } = data;
    // Convert role to roles array
    const dataWithRoles = {
      ...registerData,
      roles: [role]
    };
    const result = await dispatch(registerAction(dataWithRoles));
    if (registerAction.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Join our data platform
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                {...register('firstName', { required: 'First name is required' })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                {...register('lastName', { required: 'Last name is required' })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
          </Grid>

          <FormControl component="fieldset" margin="normal" fullWidth error={!!errors.role}>
            <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600 }}>
              I want to:
            </FormLabel>
            <RadioGroup row defaultValue="contributor">
              <FormControlLabel
                value="creator"
                control={<Radio {...register('role', { required: 'Please select your role' })} />}
                label={
                  <Box>
                    <Typography variant="body1" fontWeight={600}>Create Surveys</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Design and publish surveys to collect data
                    </Typography>
                  </Box>
                }
                sx={{
                  flex: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 2,
                  mr: 1,
                  '&:hover': { borderColor: 'primary.main' }
                }}
              />
              <FormControlLabel
                value="contributor"
                control={<Radio {...register('role', { required: 'Please select your role' })} />}
                label={
                  <Box>
                    <Typography variant="body1" fontWeight={600}>Contribute Data</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Fill out surveys and earn rewards
                    </Typography>
                  </Box>
                }
                sx={{
                  flex: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 2,
                  '&:hover': { borderColor: 'primary.main' }
                }}
              />
            </RadioGroup>
            {errors.role && (
              <FormHelperText>{errors.role.message}</FormHelperText>
            )}
          </FormControl>

          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            margin="normal"
            {...register('confirmPassword', {
              required: 'Please confirm password',
              validate: (value) => value === password || 'Passwords do not match'
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link href="/login" underline="hover">
                Login here
              </Link>
            </Typography>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
