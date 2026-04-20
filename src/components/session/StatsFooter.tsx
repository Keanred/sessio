import { Box, Button, Typography } from '@mui/material';

type StatsFooterProps = {
  statusLabel: string;
  actionLabel: string;
};

export const StatsFooter = ({ statusLabel, actionLabel }: StatsFooterProps) => {
  return (
    <Box
      component="footer"
      sx={{
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTop: '1px solid rgba(193, 198, 215, 0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        px: 2,
        py: 1.5,
      }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
        <Box aria-hidden="true" sx={{ backgroundColor: 'primary.main', borderRadius: '50%', height: 8, width: 8 }} />
        <Typography color="text.secondary" sx={{ fontSize: 11, fontWeight: 500 }}>
          {statusLabel}
        </Typography>
      </Box>

      <Button
        size="small"
        variant="text"
        sx={{
          color: 'primary.main',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          minWidth: 0,
          px: 0,
          textTransform: 'uppercase',
          '&:hover': {
            backgroundColor: 'transparent',
            opacity: 0.8,
          },
        }}
      >
        {actionLabel}
      </Button>
    </Box>
  );
};
