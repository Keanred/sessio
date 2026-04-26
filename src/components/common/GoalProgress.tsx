import { Box, LinearProgress, Typography } from '@mui/material';

type GoalProgressProps = {
  label: string;
  goalText: string;
  progressPercent: number;
  onGoalClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export const GoalProgress = ({ label, goalText, progressPercent, onGoalClick }: GoalProgressProps) => {
  const safeProgress = Math.min(100, Math.max(0, progressPercent));
  const completed = safeProgress >= 100;

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
        <Typography
          color="text.primary"
          onClick={onGoalClick}
          sx={{
            fontSize: 11,
            fontWeight: 700,
            ...(onGoalClick && {
              cursor: 'pointer',
              borderRadius: '4px',
              px: 0.5,
              '&:hover': { color: 'primary.main' },
            }),
          }}
        >
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
            background: completed ? '#22c55e' : '#0058bc',
            borderRadius: '9999px',
            transition: 'background 0.3s ease',
          },
        }}
      />
    </Box>
  );
};
