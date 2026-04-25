import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { GoalProgress } from '../common/GoalProgress';
import { NoteCard } from '../common/NoteCard';
import { PopoverFrame } from '../common/PopoverFrame';
import { PrimaryActionButton } from '../common/PrimaryActionButton';
import { FocusTimerCard } from './FocusTimerCard';
import { FocusTopNav } from './FocusTopNav';

const topNavTabs = [
  { id: 'focus', label: 'Focus', to: '/' },
  { id: 'history', label: 'History', to: '/history' },
  { id: 'stats', label: 'Stats', to: '/stats' },
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
    <PopoverFrame
      ariaLabel="Sessio session panel"
      paperSx={{
        backgroundColor: '#f9f9fb',
        border: '1px solid rgba(193, 198, 215, 0.1)',
        height: 430,
        width: 360,
      }}
    >
      <FocusTopNav title="Petite Focus" tabs={topNavTabs} showDivider={false} />

      <Box
        component="main"
        sx={{
          display: 'grid',
          flex: 1,
          gap: 1.75,
          gridTemplateRows: 'auto auto minmax(80px, 1fr) auto',
          minHeight: 0,
          overflowY: 'auto',
          p: 2,
          position: 'relative',
        }}
      >
        <FocusTimerCard sectionLabel="Current Session" timeLabel={elapsedTime.toString()} phaseLabel={sessionNote} />

        <GoalProgress label="Session Goal" goalText="45:00" progressPercent={54} />

        <NoteCard label="Session Note" noteText={sessionNote} onChange={setSessionNote} />
        <PrimaryActionButton
          label={timerState === 'running' ? 'Stop Session' : 'Start Session'}
          running={timerState}
          onClick={handleStartStop}
        />
      </Box>
    </PopoverFrame>
  );
};
