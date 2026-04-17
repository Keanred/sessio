import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0058bc',
      light: '#0070eb',
      dark: '#0f3d83',
    },
    secondary: {
      main: '#7c93bf',
    },
    background: {
      default: '#f4f7ff',
      paper: '#ffffff',
    },
    text: {
      primary: '#161c29',
      secondary: '#5f6b85',
    },
    divider: 'rgba(148, 163, 184, 0.18)',
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          minHeight: '100%',
          margin: 0,
          background:
            'radial-gradient(circle at 15% 10%, rgba(0, 88, 188, 0.22), transparent 52%), radial-gradient(circle at 85% 80%, rgba(0, 112, 235, 0.14), transparent 50%), linear-gradient(145deg, #edf2ff 0%, #fdfdff 48%, #edf4ff 100%)',
          overflow: 'hidden',
        },
        '#root': {
          minHeight: '100vh',
        },
        '::-webkit-scrollbar': {
          width: '4px',
        },
        '::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#d7deed',
          borderRadius: '999px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
