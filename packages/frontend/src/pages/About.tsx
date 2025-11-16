import { Box, Container, Typography, Grid, Paper, Avatar, Stack } from '@mui/material';
import {
  Groups,
  TrendingUp,
  Security,
  Speed,
  Public,
  VerifiedUser
} from '@mui/icons-material';

export default function About() {
  const values = [
    {
      icon: <Security sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Data Security',
      description: 'We prioritize the security and privacy of your data with enterprise-grade encryption and compliance.'
    },
    {
      icon: <Groups sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Community Driven',
      description: 'Built by the community, for the community. We empower researchers and contributors worldwide.'
    },
    {
      icon: <Speed sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Fast & Efficient',
      description: 'Streamlined data collection and analysis processes that save you time and resources.'
    },
    {
      icon: <Public sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Global Reach',
      description: 'Access contributors and datasets from around the world to power your research.'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Analytics Powered',
      description: 'Advanced analytics and AI-powered insights to help you make data-driven decisions.'
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Quality Assured',
      description: 'Rigorous verification processes ensure high-quality, reliable data for your projects.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Executive Officer',
      avatar: 'SJ',
      bio: 'PhD in Data Science with 15+ years experience in research and analytics.'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      avatar: 'MC',
      bio: 'Former tech lead at major data platforms, passionate about scalable solutions.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      avatar: 'ER',
      bio: 'Expert in user experience and product strategy for data-driven platforms.'
    },
    {
      name: 'David Okonkwo',
      role: 'Head of Community',
      avatar: 'DO',
      bio: 'Dedicated to building and nurturing our global community of contributors.'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '1M+', label: 'Survey Responses' },
    { value: '10K+', label: 'Datasets' },
    { value: '150+', label: 'Countries' }
  ];

  return (
    <Box sx={{ bgcolor: '#FAFAFA', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 12,
          mb: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" fontWeight="bold" gutterBottom align="center">
            About DataCollect
          </Typography>
          <Typography variant="h5" align="center" sx={{ maxWidth: '800px', mx: 'auto', opacity: 0.95 }}>
            Revolutionizing data collection and analysis through innovative technology
            and community collaboration.
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              At DataCollect, we're on a mission to democratize data collection and make quality
              research accessible to everyone. We believe that valuable insights shouldn't be
              limited by resources or technical expertise.
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Our platform bridges the gap between data hunters who need quality data and
              contributors who want to share their insights. We've created a thriving ecosystem
              where knowledge flows freely and everyone benefits.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Whether you're a student conducting research, a business seeking market insights,
              or a data enthusiast looking to contribute, DataCollect provides the tools,
              community, and support you need to succeed.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {stats.map((stat, index) => (
                <Grid item xs={6} key={index}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      bgcolor: 'white',
                      borderTop: '4px solid',
                      borderColor: 'primary.main'
                    }}
                  >
                    <Typography variant="h3" fontWeight="bold" color="primary.main" gutterBottom>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ bgcolor: 'white', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" gutterBottom align="center" sx={{ mb: 6 }}>
            Our Core Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {value.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom align="center" sx={{ mb: 6 }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                    mb: 2
                  }}
                >
                  {member.avatar}
                </Avatar>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="primary.main" gutterBottom>
                  {member.role}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {member.bio}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8, mb: 0 }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
            Join Our Growing Community
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 4, opacity: 0.95 }}>
            Be part of the data revolution. Whether you're creating surveys or contributing insights,
            there's a place for you here.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Box
              component="a"
              href="/forms/new"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                borderRadius: 1,
                fontWeight: 'bold',
                textAlign: 'center',
                textDecoration: 'none',
                '&:hover': {
                  bgcolor: '#f5f5f5'
                }
              }}
            >
              Create Survey
            </Box>
            <Box
              component="a"
              href="/marketplace"
              sx={{
                bgcolor: 'transparent',
                color: 'white',
                px: 4,
                py: 1.5,
                borderRadius: 1,
                fontWeight: 'bold',
                textAlign: 'center',
                textDecoration: 'none',
                border: '2px solid white',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Find Surveys
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
