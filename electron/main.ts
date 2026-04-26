import { app, ipcMain, Menu, Rectangle, session } from 'electron';
import started from 'electron-squirrel-startup';
import { createDatabase, seedSessionsIfEmpty } from './db';
import { handleLoadSessions, handleResolveAppIcon, handleSaveSession } from './session';
import { createTray, destroyTray, tray } from './tray';
import * as WindowModule from './window';
import { createWindow, showWindowNearTray } from './window';

const isDev = process.env.NODE_ENV === 'development' || !!process.env.VITE_DEV_SERVER_URL;

const db = createDatabase();
seedSessionsIfEmpty(db);
export { db };

const CSP = [
  "default-src 'self'",
  // unsafe-eval only in dev for Vite HMR source maps
  isDev ? "script-src 'self' 'unsafe-eval'" : "script-src 'self'",
  // MUI injects inline styles at runtime
  "style-src 'self' 'unsafe-inline'",
  // Google User Content images used in history view + data URIs
  "img-src 'self' data: https://lh3.googleusercontent.com",
  "font-src 'self' data:",
  // Vite dev server WebSocket for HMR
  isDev ? "connect-src 'self' ws: wss:" : "connect-src 'self'",
].join('; ');

export { mainWindow } from './window';
export { tray };

if (started) {
  app.quit();
}
if (process.platform === 'darwin') {
  app.setActivationPolicy('accessory');
}

app.whenReady().then(() => {
  ipcMain.on('save-session', (_event, session) => handleSaveSession(session));
  ipcMain.handle('load-sessions', handleLoadSessions);
  ipcMain.handle('resolve-app-icon', (_event, appName: string) => handleResolveAppIcon(appName));

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [CSP],
      },
    });
  });

  if (process.platform === 'darwin' && app.dock) {
    app.dock.hide();
  }

  const appTray = createTray();

  if (!appTray) {
    return;
  }

  const toggleWindow = (bounds: Rectangle) => {
    const win = WindowModule.mainWindow;
    if (win && !win.isDestroyed() && win.isVisible()) {
      win.hide();
    } else {
      showWindowNearTray(bounds);
    }
  };

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => toggleWindow(appTray.getBounds()),
    },
    { label: 'Quit', click: () => app.quit() },
  ]);

  appTray.on('click', (_event, bounds) => {
    toggleWindow(bounds);
  });

  appTray.on('right-click', () => {
    appTray.popUpContextMenu(contextMenu);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  destroyTray();
  db.close();
});

app.on('activate', () => {
  const trayBounds = tray?.getBounds();
  const win = WindowModule.mainWindow;

  if (trayBounds) {
    showWindowNearTray(trayBounds);
  } else if (!win || win.isDestroyed()) {
    createWindow();
  }
});
