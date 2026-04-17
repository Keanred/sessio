import { Box, Typography } from '@mui/material';
import { Icon } from '../common/Icon';

type SessionNoteCardProps = {
  label: string;
  noteText: string;
  placeholder?: string;
};

export function SessionNoteCard({ label, noteText, placeholder = 'What are you focusing on?' }: SessionNoteCardProps) {
  return (
    <Box
      component="section"
      aria-label={label}
      sx={{
        display: 'flex',
        flex: '1 1 0',
        flexDirection: 'column',
        gap: 1,
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <Typography
        color="text.secondary"
        sx={{ fontSize: 11, fontWeight: 600, letterSpacing: '-0.01em', px: 0.5, textTransform: 'uppercase' }}
      >
        {label}
      </Typography>

      <Box
        sx={{
          backgroundColor: '#f3f3f5',
          borderRadius: '8px',
          display: 'flex',
          flex: '1 1 0',
          minHeight: 96,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          component="textarea"
          aria-label={label}
          defaultValue={noteText}
          placeholder={placeholder}
          sx={{
            appearance: 'none',
            backgroundColor: 'transparent',
            border: 0,
            color: '#1a1c1d',
            flex: 1,
            fontSize: 13,
            fontFamily: 'inherit',
            lineHeight: 1.5,
            margin: 0,
            minHeight: 0,
            outline: 'none',
            overflowY: 'auto',
            p: 1.5,
            pb: 3.5,
            pr: 5,
            resize: 'none',
            width: '100%',
            '&::placeholder': {
              color: 'rgba(65, 71, 85, 0.5)',
              opacity: 1,
            },
          }}
        />

        <Box
          aria-hidden="true"
          sx={{
            alignItems: 'center',
            bottom: 8,
            color: 'rgba(65, 71, 85, 0.3)',
            display: 'inline-flex',
            position: 'absolute',
            right: 8,
          }}
        >
          <Icon name="edit_note" sx={{ fontSize: 14 }} />
        </Box>
      </Box>
    </Box>
  );
}
