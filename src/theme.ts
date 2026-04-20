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
          background: 'transparent',
        },
        body: {
          minHeight: '100%',
          margin: 0,
          background: 'transparent',
          overflow: 'hidden',
        },
        '#root': {
          minHeight: '100vh',
          background: 'transparent',
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
