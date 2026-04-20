import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { FocusPopoverFrame } from './FocusPopoverFrame';
import { FocusTimerCard } from './FocusTimerCard';
import { FocusTopNav } from './FocusTopNav';
import { SessionGoalProgress } from './SessionGoalProgress';
import { SessionNoteCard } from './SessionNoteCard';
import { SessionPrimaryAction } from './SessionPrimaryAction';

const topNavTabs = [
  { id: 'focus', label: 'Focus', isActive: true },
  { id: 'history', label: 'History' },
  { id: 'stats', label: 'Stats' },
];

export const FocusSessionLayout = () => {
  const [timerState, setTimerState] = useState<'running' | 'idle'>('idle');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string>('00.00.00');
  const [sessionNote, setSessionNote] = useState<string>('');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerState === 'running' && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;
        setElapsedTime(
          `${hours.toString().padStart(2, '0')}.${minutes
            .toString()
            .padStart(2, '0')}.${seconds.toString().padStart(2, '0')}`,
        );
      }, 1000);
    } else {
      setElapsedTime('00.00.00');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerState, startTime]);

  const handleStartStop = () => {
    if (timerState === 'idle') {
      setStartTime(new Date());
      setTimerState('running');
    } else {
      setTimerState('idle');
      setStartTime(null);
    }
  };

  return (
    <FocusPopoverFrame ariaLabel="Sessio session panel">
      <FocusTopNav title="Sessio" tabs={topNavTabs} />

      <Box
        component="main"
        sx={{
          display: 'grid',
          flex: 1,
          gap: 2,
          gridTemplateRows: 'auto auto minmax(0, 1fr) auto',
          minHeight: 0,
          overflow: 'hidden',
          p: 2,
          position: 'relative',
        }}
      >
        <FocusTimerCard sectionLabel="Current Session" timeLabel={elapsedTime.toString()} phaseLabel={sessionNote} />

        <SessionGoalProgress label="Session Goal" goalText="45:00" progressPercent={54} />

        <SessionNoteCard label="Session Note" noteText={sessionNote} onChange={setSessionNote} />
        <SessionPrimaryAction
          label={timerState === 'running' ? 'Stop Session' : 'Start Session'}
          running={timerState}
          onClick={handleStartStop}
        />
      </Box>
    </FocusPopoverFrame>
  );
};
