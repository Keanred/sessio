import { Box } from '@mui/material';
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

export function FocusSessionLayout() {
  return (
    <FocusPopoverFrame ariaLabel="Petite Focus session panel">
      <FocusTopNav title="Petite Focus" tabs={topNavTabs} />

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
        <FocusTimerCard sectionLabel="Current Session" timeLabel="24:12" phaseLabel="Deep Work Phase" />

        <SessionGoalProgress label="Session Goal" goalText="45:00" progressPercent={54} />

        <SessionNoteCard
          label="Session Note"
          noteText="Refining the UI typography for the watch app component. High precision focus needed."
        />

        <SessionPrimaryAction label="Stop Session" />
      </Box>
    </FocusPopoverFrame>
  );
}
