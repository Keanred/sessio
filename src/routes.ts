import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import App from './app';
import { FocusHistoryLayout } from './components/session/FocusHistoryLayout';
import { FocusSessionLayout } from './components/session/FocusSessionLayout';
import { FocusStatsLayout } from './components/session/FocusStatsLayout';

const rootRoute = createRootRoute({
  component: App,
});

const focusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: FocusSessionLayout,
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: FocusHistoryLayout,
});

const statsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/stats',
  component: FocusStatsLayout,
});

const routeTree = rootRoute.addChildren([focusRoute, historyRoute, statsRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}