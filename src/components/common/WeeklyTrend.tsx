import { Box, Typography } from '@mui/material';

type WeeklyTrendBar = {
  id: string;
  heightPercent: number;
  isHighlighted?: boolean;
};

type WeeklyTrendProps = {
  label: string;
  detail: string;
  bars: WeeklyTrendBar[];
};

export const WeeklyTrend = ({ label, detail, bars }: WeeklyTrendProps) => {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: '#f3f3f5',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        p: 2,
      }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <Typography color="text.secondary" sx={{ fontSize: 10, fontWeight: 700 }}>
          {label}
        </Typography>
        <Typography color="primary.main" sx={{ fontSize: 10, fontWeight: 500 }}>
          {detail}
        </Typography>
      </Box>

      <Box
        aria-hidden="true"
        sx={{
          alignItems: 'flex-end',
          display: 'flex',
          gap: 1.5,
          height: 48,
          justifyContent: 'space-between',
          px: 0.5,
        }}
      >
        {bars.map((bar) => {
          const safeHeight = Math.min(100, Math.max(0, bar.heightPercent));

          return (
            <Box
              key={bar.id}
              sx={{
                alignSelf: 'end',
                background: bar.isHighlighted
                  ? bar.heightPercent >= 90
                    ? '#0058bc'
                    : 'rgba(0, 88, 188, 0.4)'
                  : '#e2e2e4',
                borderRadius: '9999px',
                flexShrink: 0,
                height: `${safeHeight}%`,
                minHeight: safeHeight === 0 ? 6 : 0,
                width: 8,
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
};
