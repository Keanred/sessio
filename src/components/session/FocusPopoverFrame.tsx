import { Box, Paper } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

type FocusPopoverFrameProps = {
  ariaLabel: string;
  children: ReactNode;
  paperSx?: SxProps<Theme>;
};

export function FocusPopoverFrame({ ariaLabel, children, paperSx }: FocusPopoverFrameProps) {
  return (
    <>
      <Box
        aria-hidden="true"
        sx={{
          filter: 'blur(72px)',
          inset: '-30%',
          opacity: 0.55,
          pointerEvents: 'none',
          position: 'fixed',
          zIndex: 0,
          '&::before, &::after': {
            borderRadius: '999px',
            content: '""',
            position: 'absolute',
          },
          '&::before': {
            background: 'radial-gradient(circle, rgba(19, 88, 190, 0.62) 0%, transparent 62%)',
            height: '62%',
            left: '8%',
            top: '-6%',
            width: '52%',
          },
          '&::after': {
            background: 'radial-gradient(circle, rgba(124, 168, 242, 0.65) 0%, transparent 58%)',
            bottom: '-10%',
            height: '52%',
            right: '10%',
            width: '44%',
          },
        }}
      />

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
    </>
  );
}
