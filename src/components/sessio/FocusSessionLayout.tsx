import { Box, Menu, MenuItem } from '@mui/material';
import { SessionSave } from '@shared/types';
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

const GOAL_PRESETS = [10, 25, 45, 52, 90, 112];

const formatGoalText = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
};

export const FocusSessionLayout = () => {
  const [timerState, setTimerState] = useState<'running' | 'idle'>('idle');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [sessionNote, setSessionNote] = useState<string>('');
  const [goalMinutes, setGoalMinutes] = useState<number>(45);
  const [goalAnchorEl, setGoalAnchorEl] = useState<HTMLElement | null>(null);

  const h = Math.floor(elapsedSeconds / 3600);
  const m = Math.floor((elapsedSeconds % 3600) / 60);
  const s = elapsedSeconds % 60;
  const elapsedTime = `${h.toString().padStart(2, '0')}.${m.toString().padStart(2, '0')}.${s.toString().padStart(2, '0')}`;

  const progressPercent = (elapsedSeconds / (goalMinutes * 60)) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerState === 'running' && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        setElapsedSeconds(Math.floor((now.getTime() - startTime.getTime()) / 1000));
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerState, startTime]);

  const handleSaveSession = () => {
    if (startTime) {
      const endTime = new Date();
      const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
      const sessionData: SessionSave = {
        startTime: startTime.getTime(),
        endTime: endTime.getTime(),
        duration,
        note: sessionNote,
        appUsage: [], // Placeholder for app usage data
      };
      window.api.saveSession(sessionData);
      setSessionNote('');
    }
  };

  const handleStartStop = () => {
    if (timerState === 'idle') {
      setStartTime(new Date());
      setTimerState('running');
    } else {
      setTimerState('idle');
      setStartTime(null);
      handleSaveSession();
    }
  };

  const handleGoalClick = (event: React.MouseEvent<HTMLElement>) => {
    setGoalAnchorEl(event.currentTarget);
  };

  const handleGoalSelect = (minutes: number) => {
    setGoalMinutes(minutes);
    setGoalAnchorEl(null);
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
      <FocusTopNav title="Sessio Focus" tabs={topNavTabs} showDivider={false} />

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
        <FocusTimerCard sectionLabel="Current Session" timeLabel={elapsedTime} phaseLabel={'Deep focus'} />

        <GoalProgress
          label="Session Goal"
          goalText={formatGoalText(goalMinutes)}
          progressPercent={progressPercent}
          onGoalClick={timerState === 'idle' ? handleGoalClick : undefined}
        />

        <Menu
          anchorEl={goalAnchorEl}
          open={Boolean(goalAnchorEl)}
          onClose={() => setGoalAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {GOAL_PRESETS.map((minutes) => (
            <MenuItem
              key={minutes}
              selected={minutes === goalMinutes}
              onClick={() => handleGoalSelect(minutes)}
              sx={{ fontSize: 13, minWidth: 110 }}
            >
              {formatGoalText(minutes)}
            </MenuItem>
          ))}
        </Menu>

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
