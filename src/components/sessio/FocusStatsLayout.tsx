import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { AppDistribution } from '../common/AppDistribution';
import { PrimaryMetricCard, SecondaryMetricCard } from '../common/MetricCards';
import { PanelFooter } from '../common/PanelFooter';
import { PopoverFrame } from '../common/PopoverFrame';
import { WeeklyTrend } from '../common/WeeklyTrend';
import { FocusTopNav } from './FocusTopNav';

const topNavTabs = [
  { id: 'focus', label: 'Focus', to: '/' },
  { id: 'history', label: 'History', to: '/history' },
  { id: 'stats', label: 'Stats', to: '/stats' },
];

type AppDistributionItem = {
  id: string;
  appName: string;
  percent: number;
  iconName: string;
  iconUrl?: string;
  fillColor: string;
};

const weeklyTrendBars = [
  { id: 'mon', heightPercent: 40 },
  { id: 'tue', heightPercent: 65 },
  { id: 'wed', heightPercent: 85, isHighlighted: true },
  { id: 'thu', heightPercent: 50 },
  { id: 'fri', heightPercent: 95, isHighlighted: true },
  { id: 'sat', heightPercent: 30 },
  { id: 'sun', heightPercent: 0 },
];

const formatDuration = (totalSeconds: number): string => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  return `${h}h ${m}m`;
};

export const FocusStatsLayout = () => {
  const [appDistributionItems, setAppDistributionItems] = useState<AppDistributionItem[]>([]);
  const [totalFocusTime, setTotalFocusTime] = useState<string>('0h 0m');

  useEffect(() => {
    let isMounted = true;

    const loadAppUsage = async () => {
      const apps = await window.api.getAppUsage();
      const totalDuration = apps.reduce((sum, appUsage) => sum + appUsage.duration, 0);

      if (isMounted) {
        setTotalFocusTime(formatDuration(totalDuration));
      }

      const sortedApps = [...apps].sort((appA, appB) => appB.duration - appA.duration);

      const items = await Promise.all(
        sortedApps.map(async ({ appName, duration, appPath }) => {
          const iconUrl = await window.api.resolveAppIcon(appName, appPath).catch((): null => null);

          return {
            id: appName.toLowerCase().replace(/\s+/g, '-'),
            appName,
            percent: totalDuration > 0 ? Math.round((duration / totalDuration) * 100) : 0,
            iconName: 'apps',
            iconUrl: iconUrl ?? undefined,
            fillColor: 'linear-gradient(90deg, #7c93bf, #9fb0d1)',
          };
        }),
      );

      if (isMounted) {
        setAppDistributionItems(items);
      }
    };

    void loadAppUsage();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PopoverFrame
      ariaLabel="Sessio Focus stats panel"
      paperSx={{
        backgroundColor: '#f9f9fb',
        border: '1px solid rgba(193, 198, 215, 0.1)',
        boxShadow: '0 24px 48px rgba(15, 23, 42, 0.18)',
        height: 430,
        width: 360,
      }}
    >
      <FocusTopNav title="Sessio Focus" tabs={topNavTabs} showDivider={false} />

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
          <PrimaryMetricCard label="Todays Focus Time" value={totalFocusTime} delta="+12%" progressPercent={82} />

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

        <AppDistribution title="App Distribution" items={appDistributionItems} />

        <WeeklyTrend label="Weekly Trend" detail="Daily Avg: 5.2h" bars={weeklyTrendBars} />
      </Box>

      <PanelFooter statusLabel="Focusing active" actionLabel="Export Data" />
    </PopoverFrame>
  );
};
