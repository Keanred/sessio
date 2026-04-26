import type { SessionHistoryItem } from '@shared/types';
import { useEffect, useState } from 'react';
import { FilterBar } from '../common/FilterBar';
import { PopoverFrame } from '../common/PopoverFrame';
import { SummaryFooter } from '../common/SummaryFooter';
import { FocusTopNav } from './FocusTopNav';
import { HistorySessionList } from './HistorySessionList';

const topNavTabs = [
  { id: 'focus', label: 'Focus', to: '/' },
  { id: 'history', label: 'History', to: '/history' },
  { id: 'stats', label: 'Stats', to: '/stats' },
];

export const FocusHistoryLayout = () => {
  const [sessions, setSessions] = useState<SessionHistoryItem[]>([]);

  useEffect(() => {
    window.api.loadSessions().then((loadedSessions) => {
      const normalizedSessions = loadedSessions.map((session) => ({
        ...session,
        startTime: new Date(session.startTime),
        endTime: new Date(session.endTime),
        duration: new Date(session.duration * 1000).toISOString().substr(11, 8),
      }));
      setSessions(normalizedSessions);
    });
  }, [sessions.length]);
  return (
    <PopoverFrame
      ariaLabel="Sessio Focus history panel"
      paperSx={{
        backdropFilter: 'blur(24px)',
        backgroundColor: 'rgba(243, 243, 245, 0.95)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 24px 48px rgba(15, 23, 42, 0.2)',
        height: 430,
        width: 360,
      }}
    >
      <FocusTopNav title="Sessio Focus" tabs={topNavTabs} showDivider={false} />

      <FilterBar title="Recent Sessions" chipLabel="Last 7 Days" />

      <HistorySessionList items={sessions} />

      <SummaryFooter summaryLabel="6.4h focused" actionLabel="View All History" />
    </PopoverFrame>
  );
};
