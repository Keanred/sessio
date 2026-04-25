import { Link } from '@tanstack/react-router';
import { Box, IconButton, Typography } from '@mui/material';
import { Icon } from '../common/Icon';

type FocusTab = {
  id: string;
  label: string;
  to: string;
};

type FocusTopNavProps = {
  title: string;
  tabs: FocusTab[];
  showDivider?: boolean;
};

export const FocusTopNav = ({ title, tabs, showDivider = true }: FocusTopNavProps) => {
  return (
    <Box
      component="nav"
      aria-label="Session navigation"
      sx={{
        alignItems: 'center',
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(248, 250, 254, 0.88)',
        borderBottom: '1px solid transparent',
        display: 'flex',
        justifyContent: 'space-between',
        px: 1.5,
        py: 1,
        width: '100%',
      }}
    >
      <Typography color="text.primary" sx={{ fontSize: 14, fontWeight: 800 }}>
        {title}
      </Typography>

      <Box sx={{ alignItems: 'center', display: 'flex', gap: 1.25 }}>
        <Box sx={{ alignItems: 'center', display: 'flex', gap: 0.5 }}>
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.to}
              style={{
                border: 0,
                borderBottom: '1px solid transparent',
                borderRadius: '4px',
                color: '#64748b',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                padding: '0.125rem 0.5rem',
                textDecoration: 'none',
              }}
              activeProps={{
                style: {
                  borderBottom: '1px solid #2563eb',
                  color: '#2563eb',
                  fontWeight: 600,
                },
              }}
            >
              {tab.label}
            </Link>
          ))}
        </Box>

        {showDivider ? <Box sx={{ backgroundColor: 'rgba(226, 232, 240, 0.7)', height: 16, width: '1px' }} /> : null}

        <IconButton
          aria-label="Settings"
          size="small"
          sx={{
            borderRadius: '4px',
            color: 'text.secondary',
            p: 0.5,
            '&:hover': {
              backgroundColor: 'rgba(226, 232, 240, 0.55)',
            },
          }}
        >
          <Icon name="settings" sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );
};
