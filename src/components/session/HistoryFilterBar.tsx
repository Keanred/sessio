import { Box, Chip, Typography } from '@mui/material';

type HistoryFilterBarProps = {
  title: string;
  chipLabel: string;
};

export const HistoryFilterBar = ({ title, chipLabel }: HistoryFilterBarProps) => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: '#f3f3f5',
        display: 'flex',
        justifyContent: 'space-between',
        px: 2,
        py: 1,
      }}
    >
      <Typography
        color="text.secondary"
        sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}
      >
        {title}
      </Typography>
      <Chip
        label={chipLabel}
        size="small"
        sx={{
          backgroundColor: '#e2e2e4',
          borderRadius: '9999px',
          color: '#5e5e5e',
          height: 18,
          fontSize: 10,
          fontWeight: 500,
          '& .MuiChip-label': {
            px: 0.75,
          },
        }}
      />
    </Box>
  );
};
