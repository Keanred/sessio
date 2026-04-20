import { Box, Typography } from '@mui/material';

type FocusTimerCardProps = {
  sectionLabel: string;
  timeLabel: string;
  phaseLabel: string;
};

export const FocusTimerCard = ({ sectionLabel, timeLabel, phaseLabel }: FocusTimerCardProps) => {
  return (
    <Box
      component="section"
      sx={{
        alignItems: 'center',
        backgroundColor: '#f3f3f5',
        borderRadius: '12px',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        px: 3,
        py: 3,
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          background: 'linear-gradient(135deg, rgba(0, 88, 188, 0.05), rgba(0, 88, 188, 0))',
          inset: 0,
          position: 'absolute',
        }}
      />

      <Typography
        sx={{
          color: '#5e5e5e',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.16em',
          mb: 0.75,
          position: 'relative',
          textTransform: 'uppercase',
        }}
      >
        {sectionLabel}
      </Typography>
      <Typography
        sx={{
          color: 'text.primary',
          fontSize: 56,
          fontWeight: 800,
          letterSpacing: '-0.06em',
          lineHeight: 1,
          position: 'relative',
          textShadow: '0 0 20px rgba(0, 88, 188, 0.15)',
        }}
      >
        {timeLabel}
      </Typography>

      <Box
        aria-label={phaseLabel}
        sx={{
          alignItems: 'center',
          backgroundColor: '#e4e2e2',
          borderRadius: '9999px',
          display: 'inline-flex',
          gap: 0.75,
          mt: 1.5,
          px: 1,
          py: 0.375,
          position: 'relative',
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            animation: 'pulse 1.8s ease-in-out infinite',
            backgroundColor: 'primary.main',
            borderRadius: '50%',
            height: 6,
            width: 6,
            '@keyframes pulse': {
              '0%, 100%': {
                opacity: 1,
                transform: 'scale(1)',
              },
              '50%': {
                opacity: 0.6,
                transform: 'scale(1.15)',
              },
            },
          }}
        />
        <Typography sx={{ color: '#646464', fontSize: 10, fontWeight: 600, lineHeight: 1 }}>{phaseLabel}</Typography>
      </Box>
    </Box>
  );
};
