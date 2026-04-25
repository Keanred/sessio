import type { Session } from '@shared/types';

export interface IElectronAPI {
  saveSession: (session: Session) => void;
  loadSessions: () => Promise<Session[]>;
  resolveAppIcon: (appName: string) => Promise<string | null>;
}

declare global {
  interface Window {
    api: IElectronAPI;
  }
}
