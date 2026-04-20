import { app, nativeImage, Tray } from 'electron';
import { existsSync } from 'node:fs';
import path from 'node:path';

export let tray: Tray | null = null;

const getTrayIconPath = (): string | undefined => {
  const candidates = [
    path.join(app.getAppPath(), 'assets', 'trayTemplate.png'),
    path.join(process.cwd(), 'assets', 'trayTemplate.png'),
    path.join(__dirname, '..', '..', 'assets', 'trayTemplate.png'),
    path.join(app.getAppPath(), 'assets', 'icon.png'),
    path.join(process.cwd(), 'assets', 'icon.png'),
    path.join(__dirname, '..', '..', 'assets', 'icon.png'),
  ];

  return candidates.find((candidate) => existsSync(candidate));
};

const getTrayImage = () => {
  const trayIconPath = getTrayIconPath();

  if (!trayIconPath) {
    return null;
  }

  let image = nativeImage.createFromPath(trayIconPath);

  if (image.isEmpty()) {
    return null;
  }

  if (process.platform === 'darwin') {
    const { width, height } = image.getSize();
    if (width > 18 || height > 18) {
      image = image.resize({ width: 18, height: 18, quality: 'best' });
    }
    image.setTemplateImage(trayIconPath.endsWith('trayTemplate.png'));
  } else {
    const { width, height } = image.getSize();
    if (width !== 32 || height !== 32) {
      image = image.resize({ width: 32, height: 32, quality: 'best' });
    }
  }

  return image;
};

export const createTray = (): Tray | null => {
  const trayImage = getTrayImage();

  if (!trayImage) {
    console.warn('Tray icon not found in expected locations');
    return null;
  }

  tray = new Tray(trayImage);
  tray.setToolTip('Sessio');

  return tray;
};

export const destroyTray = () => {
  tray?.destroy();
  tray = null;
};
