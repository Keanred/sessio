import { Box, Button } from '@mui/material';
import { Icon } from '../common/Icon';

type SessionPrimaryActionProps = {
  label: string;
};

export function SessionPrimaryAction({ label }: SessionPrimaryActionProps) {
  return (
    <Box sx={{ flexShrink: 0, pt: 0.5 }}>
      <Button
        aria-label={label}
        fullWidth
        size="large"
        startIcon={<Icon name="stop_circle" filled sx={{ fontSize: 18 }} />}
        type="button"
        variant="contained"
        sx={{
          background: 'linear-gradient(180deg, #0058bc 0%, #0070eb 100%)',
          borderRadius: '8px',
          boxShadow: '0 12px 24px rgba(0, 88, 188, 0.2)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.08em',
          minHeight: 48,
          textTransform: 'uppercase',
          '&:hover': {
            background: 'linear-gradient(180deg, #0052ae 0%, #0067d8 100%)',
          },
        }}
      >
        {label}
      </Button>
    </Box>
  );
}
