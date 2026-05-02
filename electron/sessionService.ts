import { activeWindow } from 'get-windows';
import { handleSaveSession } from './session';
import { app } from 'electron';

class SessionService {
  private static instance: SessionService;
  private appUsage: { [key: string]: number } = {};
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
        this.trackAppUsage(currentWindow.owner.name, 1);
      }
    };

    this.intervalId = setInterval(() => {
      poll();
    }, 1000);
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
      appUsage: Object.entries(this.appUsage).map(([appName, duration]) => ({
        appName,
        duration,
      })),
    });
  }

  public trackAppUsage(appName: string, duration: number): void {
    if (this.appUsage[appName]) {
      this.appUsage[appName] += duration;
    } else {
      this.appUsage[appName] = duration;
    }
  }

  public getSessionDuration(): number {
    return this.sessionDuration;
  }

  public getAppUsage(): { [key: string]: number } {
    return this.appUsage;
  }
}

export default SessionService.getInstance();
