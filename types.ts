export type AppUsage = {
  appName: string;
  duration: number;
  appPath?: string;
};

export type Session = {
  id: string;
  startTime: number;
  endTime: number;
  duration: number;
  note?: string;
  appUsage: AppUsage[];
};

export type SessionSave = {
  startTime: number;
  endTime: number;
  duration: number;
  note?: string;
  appUsage: AppUsage[];
};

export type SessionHistoryItem = {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: string;
  note?: string;
  appUsage: AppUsage[];
};
