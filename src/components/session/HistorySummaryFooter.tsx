import { Box, Button, Typography } from '@mui/material';
import { Icon } from '../common/Icon';

type HistorySummaryFooterProps = {
  summaryLabel: string;
  actionLabel: string;
};

export function HistorySummaryFooter({ summaryLabel, actionLabel }: HistorySummaryFooterProps) {
  return (
    <Box
      component="footer"
      sx={{
        alignItems: 'center',
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        height: 40,
        justifyContent: 'space-between',
        px: 2,
      }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
        <Box aria-hidden="true" sx={{ backgroundColor: 'primary.main', borderRadius: '50%', height: 8, width: 8 }} />
        <Typography color="text.primary" sx={{ fontSize: 10, fontWeight: 700 }}>
          {summaryLabel}
        </Typography>
      </Box>

      <Button
        endIcon={<Icon name="arrow_forward" sx={{ fontSize: 12 }} />}
        sx={{
          color: 'primary.light',
          fontSize: 10,
          fontWeight: 600,
          gap: 0.25,
          minWidth: 0,
          px: 0,
          '&:hover': {
            backgroundColor: 'transparent',
            color: 'primary.main',
          },
        }}
        size="small"
        variant="text"
      >
        {actionLabel}
      </Button>
    </Box>
  );
}
