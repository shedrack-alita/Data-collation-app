import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C92258',
      light: '#E94A7A',
      dark: '#A01B46'
    },
    secondary: {
      main: '#2C2C2C',
      light: '#4A4A4A',
      dark: '#1A1A1A'
    },
    success: {
      main: '#2e7d32'
    },
    error: {
      main: '#d32f2f'
    },
    warning: {
      main: '#ed6c02'
    },
    info: {
      main: '#C92258'
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#6B6B6B'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }
      }
    }
  }
});

export default theme;
