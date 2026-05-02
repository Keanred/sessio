import type { Session, SessionSave } from '@shared/types';

export interface IElectronAPI {
  saveSession: (session: SessionSave) => void;
  loadSessions: () => Promise<Session[]>;
  resolveAppIcon: (appName: string) => Promise<string | null>;
  startSession: () => Promise<void>;
  endSession: (note?: string) => Promise<void>;
}

declare global {
  interface Window {
    api: IElectronAPI;
  }
}
