import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet } from '@tanstack/react-router';
import { appTheme } from './theme';

const App = () => {
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
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default App;
