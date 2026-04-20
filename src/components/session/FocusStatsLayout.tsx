import { Box } from '@mui/material';
import { FocusPopoverFrame } from './FocusPopoverFrame';
import { FocusTopNav } from './FocusTopNav';
import { StatsAppDistribution } from './StatsAppDistribution';
import { StatsFooter } from './StatsFooter';
import { PrimaryMetricCard, SecondaryMetricCard } from './StatsMetricCards';
import { StatsWeeklyTrend } from './StatsWeeklyTrend';

const topNavTabs = [
  { id: 'focus', label: 'Focus' },
  { id: 'history', label: 'History' },
  { id: 'stats', label: 'Stats', isActive: true },
];

const appDistributionItems = [
  {
    id: 'vscode',
    appName: 'VS Code',
    percent: 70,
    iconName: 'terminal',
    fillColor: 'linear-gradient(90deg, #0058bc, #0070eb)',
  },
  {
    id: 'chrome',
    appName: 'Chrome',
    percent: 15,
    iconName: 'public',
    fillColor: 'linear-gradient(90deg, #7c93bf, #9fb0d1)',
  },
  {
    id: 'slack',
    appName: 'Slack',
    percent: 15,
    iconName: 'forum',
    fillColor: 'linear-gradient(90deg, #7c93bf, #9fb0d1)',
  },
];

const weeklyTrendBars = [
  { id: 'mon', heightPercent: 40 },
  { id: 'tue', heightPercent: 65 },
  { id: 'wed', heightPercent: 85, isHighlighted: true },
  { id: 'thu', heightPercent: 50 },
  { id: 'fri', heightPercent: 95, isHighlighted: true },
  { id: 'sat', heightPercent: 30 },
  { id: 'sun', heightPercent: 0 },
];

export const FocusStatsLayout = () => {
  return (
    <FocusPopoverFrame
      ariaLabel="Petite Focus stats panel"
      paperSx={{
        backgroundColor: '#f9f9fb',
        border: '1px solid rgba(193, 198, 215, 0.1)',
        boxShadow: '0 24px 48px rgba(15, 23, 42, 0.18)',
        height: 400,
      }}
    >
      <FocusTopNav title="Petite Focus" tabs={topNavTabs} showDivider={false} />

      <Box
        component="main"
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          gap: 2,
          minHeight: 0,
          overflowY: 'auto',
          p: 2,
          position: 'relative',
        }}
      >
        <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: '1fr 1fr' }}>
          <PrimaryMetricCard label="Today's Focus Time" value="6h 42m" delta="+12%" progressPercent={82} />

          <SecondaryMetricCard
            label="Top App"
            value="VS Code"
            iconName="code"
            iconClassName="stats-secondary-icon-primary"
          />

          <SecondaryMetricCard
            label="Efficiency"
            value="94% Score"
            iconName="bolt"
            iconClassName="stats-secondary-icon-tertiary"
          />
        </Box>

        <StatsAppDistribution title="App Distribution" items={appDistributionItems} />

        <StatsWeeklyTrend label="Weekly Trend" detail="Daily Avg: 5.2h" bars={weeklyTrendBars} />
      </Box>

      <StatsFooter statusLabel="Focusing active" actionLabel="Export Data" />
    </FocusPopoverFrame>
  );
};
