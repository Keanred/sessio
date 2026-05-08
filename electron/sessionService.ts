import { app } from 'electron';
import { activeWindow } from 'get-windows';
import type { AppUsage } from './types';
import { handleSaveSession } from './session';

type LiveAppUsageByName = Record<string, { duration: number; appPath?: string }>;

class SessionService {
  private static instance: SessionService;
  private appUsage: LiveAppUsageByName = {};
  private sessionStartTime: number = 0;
  private sessionEndTime: number = 0;
  private sessionDuration: number = 0;
  private intervalId: NodeJS.Timeout | null = null;

  private constructor() {}

  public static getInstance(): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService();
    }
    return SessionService.instance;
  }

  public startSession(): void {
    if (this.intervalId !== null) return;

    this.appUsage = {};
    this.sessionStartTime = Date.now();

    const poll = async () => {
      const currentWindow = await activeWindow();
      if (currentWindow && currentWindow.owner.name !== app.getName()) {
        this.trackAppUsage(currentWindow.owner.name, 5, currentWindow.owner.path);
      }
    };

    this.intervalId = setInterval(() => {
      poll();
    }, 5000);
  }

  public endSession(note?: string): void {
    if (this.sessionStartTime === 0) {
      throw new Error('Session has not been started.');
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.sessionEndTime = Date.now();
    this.sessionDuration = this.sessionEndTime - this.sessionStartTime;

    handleSaveSession({
      startTime: this.sessionStartTime,
      endTime: this.sessionEndTime,
      duration: this.sessionDuration,
      note,
      appUsage: Object.entries(this.appUsage).map(([appName, usage]) => ({
        appName,
        duration: usage.duration,
        appPath: usage.appPath,
      })),
    });
  }

  public trackAppUsage(appName: string, duration: number, appPath?: string): void {
    if (this.appUsage[appName]) {
      this.appUsage[appName].duration += duration;
      if (!this.appUsage[appName].appPath && appPath) {
        this.appUsage[appName].appPath = appPath;
      }
    } else {
      this.appUsage[appName] = {
        duration,
        appPath,
      };
    }
  }

  public getSessionDuration(): number {
    return this.sessionDuration;
  }

  public getAppUsage(): AppUsage[] {
    return Object.entries(this.appUsage).map(([appName, usage]) => ({
      appName,
      duration: usage.duration,
      appPath: usage.appPath,
    }));
  }
}

export default SessionService.getInstance();
