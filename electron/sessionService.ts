class SessionService {
  private static instance: SessionService;
  private appUsage: { [key: string]: number } = {};
  private sessionStartTime: number = 0;
  private sessionEndTime: number = 0;
  private sessionDuration: number = 0;

  private constructor() {}

  public static getInstance(): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService();
    }
    return SessionService.instance;
  }

  public startSession(): void {
    this.sessionStartTime = Date.now();
  }

  public endSession(): void {
    this.sessionEndTime = Date.now();
    this.sessionDuration = this.sessionEndTime - this.sessionStartTime;
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
