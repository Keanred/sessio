import type { Rectangle } from 'electron';
import { app, BrowserWindow, screen } from 'electron';
import { existsSync } from 'node:fs';
import path from 'node:path';

export let mainWindow: BrowserWindow | null = null;

export const WINDOW_WIDTH = 800;
export const WINDOW_HEIGHT = 800;

export const getWindowIconPath = (): string | undefined => {
  const platformIcon = process.platform === 'win32' ? 'icon.ico' : 'icon.png';
  const candidates = [
    path.join(app.getAppPath(), 'assets', 'sessio-logo.png'),
    path.join(app.getAppPath(), 'assets', platformIcon),
    path.join(process.cwd(), 'assets', 'sessio-logo.png'),
    path.join(process.cwd(), 'assets', platformIcon),
    path.join(__dirname, '..', '..', 'assets', 'sessio-logo.png'),
    path.join(__dirname, '..', '..', 'assets', platformIcon),
  ];

  return candidates.find((candidate) => existsSync(candidate));
};

export const createWindow = (): BrowserWindow => {
  const windowIconPath = getWindowIconPath();

  mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    transparent: true,
    backgroundColor: '#00000000',
    frame: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    ...(windowIconPath ? { icon: windowIconPath } : {}),
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.webContents.openDevTools();

  mainWindow.on('blur', () => {
    if (mainWindow && !mainWindow.isDestroyed() && mainWindow.isVisible()) {
      mainWindow.hide();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  return mainWindow;
};

export const getOrCreateWindow = (): BrowserWindow => {
  return mainWindow && !mainWindow.isDestroyed() ? mainWindow : createWindow();
};

export const positionWindowNearTray = (window: BrowserWindow, trayBounds: Rectangle) => {
  const display = screen.getDisplayNearestPoint({ x: trayBounds.x, y: trayBounds.y });
  const { x: workX, y: workY, width: workWidth, height: workHeight } = display.workArea;

  const x = Math.round(trayBounds.x + trayBounds.width / 2 - WINDOW_WIDTH / 2);
  const y =
    process.platform === 'darwin'
      ? Math.round(trayBounds.y + trayBounds.height + 8)
      : Math.round(trayBounds.y - WINDOW_HEIGHT - 8);

  const clampedX = Math.min(Math.max(x, workX), workX + workWidth - WINDOW_WIDTH);
  const clampedY = Math.min(Math.max(y, workY), workY + workHeight - WINDOW_HEIGHT);

  window.setBounds({ x: clampedX, y: clampedY, width: WINDOW_WIDTH, height: WINDOW_HEIGHT }, false);
};

export const showWindowNearTray = (trayBounds: Rectangle) => {
  const window = getOrCreateWindow();

  positionWindowNearTray(window, trayBounds);
  window.show();
  window.focus();
};
