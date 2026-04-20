import type { Rectangle } from 'electron';
import { app, Menu } from 'electron';
import started from 'electron-squirrel-startup';
import { createTray, destroyTray, tray } from './tray';
import * as WindowModule from './window';
import { createWindow, showWindowNearTray } from './window';

export { mainWindow } from './window';
export { tray };

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}
if (process.platform === 'darwin') {
  app.setActivationPolicy('accessory');
}

app.whenReady().then(() => {
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
