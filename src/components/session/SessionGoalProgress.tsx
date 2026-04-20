import { Box, LinearProgress, Typography } from '@mui/material';

type SessionGoalProgressProps = {
  label: string;
  goalText: string;
  progressPercent: number;
};

export const SessionGoalProgress = ({ label, goalText, progressPercent }: SessionGoalProgressProps) => {
  const safeProgress = Math.min(100, Math.max(0, progressPercent));

  return (
    <Box
      component="section"
      aria-label={label}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box sx={{ alignItems: 'flex-end', display: 'flex', justifyContent: 'space-between', px: 0.5 }}>
        <Typography
          color="text.secondary"
          sx={{ fontSize: 11, fontWeight: 600, letterSpacing: '-0.01em', textTransform: 'uppercase' }}
        >
          {label}
        </Typography>
        <Typography color="text.primary" sx={{ fontSize: 11, fontWeight: 700 }}>
          {goalText}
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
          '& .MuiLinearProgress-bar': {
            background: '#0058bc',
            borderRadius: '9999px',
          },
        }}
      />
    </Box>
  );
};
