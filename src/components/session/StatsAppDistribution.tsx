import { Box, LinearProgress, Typography } from '@mui/material';
import { Icon } from '../common/Icon';

type DistributionItem = {
  id: string;
  appName: string;
  percent: number;
  iconName: string;
  fillColor?: string;
};

type StatsAppDistributionProps = {
  title: string;
  items: DistributionItem[];
};

function DistributionRow({ item }: { item: DistributionItem }) {
  const safePercent = Math.min(100, Math.max(0, item.percent));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, px: 0.5 }}>
      <Box sx={{ alignItems: 'flex-end', display: 'flex', justifyContent: 'space-between', mb: 0.25 }}>
        <Box sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(26, 28, 29, 0.05)',
              borderRadius: '4px',
              color: 'primary.main',
              display: 'inline-flex',
              height: 24,
              justifyContent: 'center',
              width: 24,
            }}
          >
            <Icon name={item.iconName} sx={{ fontSize: 16 }} />
          </Box>
          <Typography color="text.primary" sx={{ fontSize: 12, fontWeight: 500 }}>
            {item.appName}
          </Typography>
        </Box>

        <Typography color="text.secondary" sx={{ fontSize: 11, fontWeight: 700 }}>
          {safePercent}%
        </Typography>
      </Box>

      <LinearProgress
        aria-hidden="true"
        value={safePercent}
        variant="determinate"
        sx={{
          backgroundColor: '#e2e2e4',
          borderRadius: '9999px',
          height: 4,
          '& .MuiLinearProgress-bar': {
            background: item.fillColor ?? '#0070eb',
            borderRadius: '9999px',
          },
        }}
      />
    </Box>
  );
}

export function StatsAppDistribution({ title, items }: StatsAppDistributionProps) {
  return (
    <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography
        color="text.secondary"
        sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', px: 0.5, textTransform: 'uppercase' }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {items.map((item) => (
          <DistributionRow key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  );
}
