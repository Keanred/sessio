import { Avatar, Box, Typography } from '@mui/material';

type HistorySessionItem = {
  id: string;
  appName: string;
  duration: string;
  timestamp: string;
  note: string;
  iconUrl: string;
  iconAlt: string;
  iconBackgroundColor?: string;
};

type HistorySessionListProps = {
  items: HistorySessionItem[];
};

const HistorySessionRow = ({ item }: { item: HistorySessionItem }) => {
  return (
    <Box
      component="article"
      sx={{
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        display: 'flex',
        gap: 1.5,
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08)',
        cursor: 'default',
        p: 1,
        transition: 'background-color 160ms ease',
        '&:hover': {
          backgroundColor: '#ffffff',
        },
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: item.iconBackgroundColor ?? 'rgba(242, 245, 252, 0.94)',
          borderRadius: '8px',
          display: 'flex',
          flexShrink: 0,
          height: 32,
          justifyContent: 'center',
          mt: 0.5,
          width: 32,
        }}
      >
        <Avatar alt={item.iconAlt} src={item.iconUrl} sx={{ height: 24, width: 24 }} variant="rounded" />
      </Box>

      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', minWidth: 0 }}>
        <Box sx={{ alignItems: 'baseline', display: 'flex', gap: 1, justifyContent: 'space-between' }}>
          <Typography color="text.primary" noWrap sx={{ fontSize: 13, fontWeight: 600 }}>
            {item.appName}
          </Typography>
          <Typography color="primary.main" sx={{ fontSize: 11, fontWeight: 500 }}>
            {item.duration}
          </Typography>
        </Box>

        <Typography color="text.secondary" sx={{ fontSize: 10, fontWeight: 500, mt: 0.125 }}>
          {item.timestamp}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            fontSize: 11,
            lineClamp: 2,
            lineHeight: 1.25,
            mt: 0.5,
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {item.note}
        </Typography>
      </Box>
    </Box>
  );
};

export const HistorySessionList = ({ items }: HistorySessionListProps) => {
  return (
    <Box
      component="main"
      aria-label="Recent focus sessions"
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: 0.5,
        minHeight: 0,
        overflowY: 'auto',
        pb: 2,
        px: 1.5,
        pt: 0.5,
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {items.map((item) => (
        <HistorySessionRow key={item.id} item={item} />
      ))}
    </Box>
  );
};
