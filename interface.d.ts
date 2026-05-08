import type { Session, SessionSave } from '@shared/types';
import type { AppUsage } from '@shared/types';

export interface IElectronAPI {
  saveSession: (session: SessionSave) => void;
  loadSessions: () => Promise<Session[]>;
  resolveAppIcon: (appName: string, appPath?: string) => Promise<string | null>;
  startSession: () => Promise<void>;
  endSession: (note?: string) => Promise<void>;
  getAppUsage: () => Promise<AppUsage[]>;
}

declare global {
  interface Window {
    api: IElectronAPI;
  }
}
