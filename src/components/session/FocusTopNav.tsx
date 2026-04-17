import { Box, IconButton, Typography } from '@mui/material';
import { Icon } from '../common/Icon';

type FocusTab = {
  id: string;
  label: string;
  isActive?: boolean;
};

type FocusTopNavProps = {
  title: string;
  tabs: FocusTab[];
  showDivider?: boolean;
};

export function FocusTopNav({ title, tabs, showDivider = true }: FocusTopNavProps) {
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
            <Box
              key={tab.id}
              component="button"
              type="button"
              sx={{
                backgroundColor: tab.isActive ? 'transparent' : 'transparent',
                border: 0,
                borderBottom: tab.isActive ? '1px solid #2563eb' : '1px solid transparent',
                borderRadius: '4px',
                color: tab.isActive ? '#2563eb' : '#64748b',
                cursor: 'default',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: tab.isActive ? 600 : 500,
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                px: 0.5,
                py: 0.125,
              }}
            >
              {tab.label}
            </Box>
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
}
