import { Paper } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

type FocusPopoverFrameProps = {
  ariaLabel: string;
  children: ReactNode;
  paperSx?: SxProps<Theme>;
};

export const FocusPopoverFrame = ({ ariaLabel, children, paperSx }: FocusPopoverFrameProps) => {
  return (
    <Paper
      component="article"
      aria-label={ariaLabel}
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 24px 48px rgba(15, 23, 42, 0.18)',
        display: 'flex',
        flexDirection: 'column',
        height: 460,
        overflow: 'hidden',
        position: 'relative',
        width: 320,
        zIndex: 1,
        '&::after': {
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0) 30%, rgba(166, 184, 224, 0.05) 100%)',
          content: '""',
          inset: 0,
          pointerEvents: 'none',
          position: 'absolute',
        },
        ...paperSx,
      }}
    >
      {children}
    </Paper>
  );
};
