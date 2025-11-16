import { Box, Container, Grid, Typography, Link, Stack, Divider } from '@mui/material';
import {
  Assessment,
  Email,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram
} from '@mui/icons-material';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#2C2C2C',
        color: 'white',
        pt: 6,
        pb: 3,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Assessment sx={{ fontSize: 32, color: '#C92258', mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                DataCollect
              </Typography>
            </Box>
            <Typography variant="body2" color="rgba(255,255,255,0.7)" sx={{ mb: 2 }}>
              Empowering data collection, analysis, and collaboration for researchers,
              businesses, and data enthusiasts worldwide.
            </Typography>
            <Stack direction="row" spacing={1}>
              <Link href="#" color="inherit" sx={{ '&:hover': { color: '#C92258' } }}>
                <Facebook />
              </Link>
              <Link href="#" color="inherit" sx={{ '&:hover': { color: '#C92258' } }}>
                <Twitter />
              </Link>
              <Link href="#" color="inherit" sx={{ '&:hover': { color: '#C92258' } }}>
                <LinkedIn />
              </Link>
              <Link href="#" color="inherit" sx={{ '&:hover': { color: '#C92258' } }}>
                <Instagram />
              </Link>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Platform
            </Typography>
            <Stack spacing={1}>
              <Link href="/forms/new" color="rgba(255,255,255,0.7)" underline="none" sx={{ '&:hover': { color: '#C92258' } }}>
                Create Survey
              </Link>
              <Link href="/marketplace" color="rgba(255,255,255,0.7)" underline="none" sx={{ '&:hover': { color: '#C92258' } }}>
                Find Surveys
              </Link>
              <Link href="/analytics" color="rgba(255,255,255,0.7)" underline="none" sx={{ '&:hover': { color: '#C92258' } }}>
                Analytics
              </Link>
              <Link href="/about" color="rgba(255,255,255,0.7)" underline="none" sx={{ '&:hover': { color: '#C92258' } }}>
                About Us
              </Link>
            </Stack>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Resources
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="rgba(255,255,255,0.7)" underline="none" sx={{ '&:hover': { color: '#C92258' } }}>
                Documentation
              </Link>
              <Link href="#" color="rgba(255,255,255,0.7)" underline="none" sx={{ '&:hover': { color: '#C92258' } }}>
                API Reference
              </Link>
              <Link href="#" color="rgba(255,255,255,0.7)" underline="none" sx={{ '&:hover': { color: '#C92258' } }}>
                Tutorials
              </Link>
              <Link href="#" color="rgba(255,255,255,0.7)" underline="none" sx={{ '&:hover': { color: '#C92258' } }}>
                Blog
              </Link>
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Contact Us
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 20, color: '#C92258' }} />
                <Typography variant="body2" color="rgba(255,255,255,0.7)">
                  support@datacollect.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 20, color: '#C92258' }} />
                <Typography variant="body2" color="rgba(255,255,255,0.7)">
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOn sx={{ fontSize: 20, color: '#C92258' }} />
                <Typography variant="body2" color="rgba(255,255,255,0.7)">
                  123 Data Street, Analytics City, DC 12345
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.1)' }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            © {currentYear} DataCollect. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="#" color="rgba(255,255,255,0.7)" underline="none" variant="body2" sx={{ '&:hover': { color: '#C92258' } }}>
              Privacy Policy
            </Link>
            <Link href="#" color="rgba(255,255,255,0.7)" underline="none" variant="body2" sx={{ '&:hover': { color: '#C92258' } }}>
              Terms of Service
            </Link>
            <Link href="#" color="rgba(255,255,255,0.7)" underline="none" variant="body2" sx={{ '&:hover': { color: '#C92258' } }}>
              Cookie Policy
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
