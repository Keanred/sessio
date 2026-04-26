import type { Session, SessionSave } from '@shared/types';

export interface IElectronAPI {
  saveSession: (session: SessionSave) => void;
  loadSessions: () => Promise<Session[]>;
  resolveAppIcon: (appName: string) => Promise<string | null>;
}

declare global {
  interface Window {
    api: IElectronAPI;
  }
}
