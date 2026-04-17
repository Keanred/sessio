import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { FocusSessionLayout } from './components/session';
import { appTheme } from './theme';

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          minHeight: '100vh',
          px: 2.5,
          position: 'relative',
          width: '100%',
        }}
      >
        <FocusSessionLayout />
      </Box>
    </ThemeProvider>
  );
}
