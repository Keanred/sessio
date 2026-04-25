import { Box, LinearProgress, Typography } from '@mui/material';
import { Icon } from './Icon';

type PrimaryMetricCardProps = {
  label: string;
  value: string;
  delta: string;
  progressPercent: number;
};

type SecondaryMetricCardProps = {
  label: string;
  value: string;
  iconName: string;
  iconClassName?: string;
};

export const PrimaryMetricCard = ({ label, value, delta, progressPercent }: PrimaryMetricCardProps) => {
  const safeProgress = Math.min(100, Math.max(0, progressPercent));

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.75,
        gridColumn: 'span 2',
        p: 2,
      }}
    >
      <Typography
        color="text.secondary"
        sx={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', opacity: 0.7, textTransform: 'uppercase' }}
      >
        {label}
      </Typography>

      <Box sx={{ alignItems: 'baseline', display: 'flex', gap: 0.5, mt: 0.25 }}>
        <Typography color="text.primary" sx={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em' }}>
          {value}
        </Typography>
        <Typography color="primary.main" sx={{ fontSize: 12, fontWeight: 600 }}>
          {delta}
        </Typography>
      </Box>

      <LinearProgress
        aria-hidden="true"
        value={safeProgress}
        variant="determinate"
        sx={{
          backgroundColor: '#e2e2e4',
          borderRadius: '9999px',
          height: 4,
          mt: 0.25,
          '& .MuiLinearProgress-bar': {
            background: 'linear-gradient(90deg, #0058bc, #0070eb)',
            borderRadius: '9999px',
          },
        }}
      />
    </Box>
  );
};

export const SecondaryMetricCard = ({ label, value, iconName, iconClassName }: SecondaryMetricCardProps) => {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: '#f3f3f5',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.75,
        minHeight: 76,
        p: 1.5,
      }}
    >
      <Typography color="text.secondary" sx={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase' }}>
        {label}
      </Typography>

      <Box sx={{ alignItems: 'center', display: 'flex', gap: 1, mt: 0.25 }}>
        <Icon
          name={iconName}
          filled
          sx={{
            color: iconClassName === 'stats-secondary-icon-tertiary' ? '#9e3d00' : '#0070eb',
            fontSize: 18,
          }}
        />
        <Typography color="text.primary" sx={{ fontSize: 13, fontWeight: 700 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};
