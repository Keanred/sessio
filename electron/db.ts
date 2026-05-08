import database, { Database } from 'better-sqlite3';
import { SessionSave } from './types';
const dbName = 'sessio.db';

export type SessionRow = {
  id: string;
  startTime: number;
  endTime: number;
  duration: number;
  note: string | null;
};

export type AppUsageRow = {
  appName: string;
  duration: number;
  appPath?: string;
};

export const createDatabase = (): Database => {
  const db = database(dbName);

  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY NOT NULL,
      startTime INTEGER NOT NULL,
      endTime INTEGER NOT NULL,
      duration INTEGER NOT NULL,
      note TEXT
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS app_usage (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sessionId TEXT NOT NULL,
      appName TEXT NOT NULL,
      appPath TEXT,
      duration INTEGER NOT NULL,
      FOREIGN KEY (sessionId) REFERENCES sessions(id) ON DELETE CASCADE
    );
  `);

  const appUsageColumns = db
    .prepare("SELECT name FROM pragma_table_info('app_usage')")
    .all() as Array<{ name: string }>;
  const hasAppPathColumn = appUsageColumns.some((column) => column.name === 'appPath');

  if (!hasAppPathColumn) {
    db.exec('ALTER TABLE app_usage ADD COLUMN appPath TEXT;');
  }

  // Normalize legacy duration values that were saved in milliseconds.
  db.exec(`
    UPDATE sessions
    SET duration = CAST(ROUND(duration / 1000.0) AS INTEGER)
    WHERE duration > 100000;
  `);

  db.exec(`
    UPDATE app_usage
    SET duration = CAST(ROUND(duration / 1000.0) AS INTEGER)
    WHERE duration > 100000;
  `);

  return db;
};

export const insertSession = (db: database.Database, session: SessionSave) => {
  const uuid = crypto.randomUUID();
  const insertedSession = {
    ...session,
    id: uuid,
  };
  const insertSessionStmt = db.prepare(`
    INSERT INTO sessions (id, startTime, endTime, duration, note)
    VALUES (@id, @startTime, @endTime, @duration, @note);
  `);

  const insertAppUsageStmt = db.prepare(`
    INSERT INTO app_usage (sessionId, appName, appPath, duration)
    VALUES (@sessionId, @appName, @appPath, @duration);
  `);

  const insertSessionTransaction = db.transaction((session: SessionSave) => {
    insertSessionStmt.run(insertedSession);

    for (const appUsage of session.appUsage) {
      insertAppUsageStmt.run({
        sessionId: insertedSession.id,
        appName: appUsage.appName,
        appPath: appUsage.appPath,
        duration: appUsage.duration,
      });
    }
  });

  insertSessionTransaction(session);
};

export const getTodaysSessionDuration = (db: database.Database): number => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const startOfDayTimestamp = startOfDay.getTime();

  const result = db
    .prepare('SELECT SUM(duration) as totalDuration FROM sessions WHERE startTime >= ?')
    .get(startOfDayTimestamp) as { totalDuration: number | null };

  return result.totalDuration || 0;
};

export const getAverageSessionDuration = (db: database.Database): number => {
  const result = db.prepare('SELECT AVG(duration) as avgDuration FROM sessions').get() as {
    avgDuration: number | null;
  };
  return result.avgDuration || 0;
};

export const getTodaysTopApp = (db: database.Database): { appName: string; totalDuration: number } | null => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const startOfDayTimestamp = startOfDay.getTime();

  const result = db
    .prepare(
      `
    SELECT appName, SUM(duration) as totalDuration
    FROM app_usage
    JOIN sessions ON app_usage.sessionId = sessions.id
    WHERE sessions.startTime >= ?
    GROUP BY appName
    ORDER BY totalDuration DESC
    LIMIT 1;
  `,
    )
    .get(startOfDayTimestamp) as { appName: string; totalDuration: number } | undefined;

  return result || null;
};

export const getSessionRows = (db: database.Database) => {
  return db.prepare('SELECT id, startTime, endTime, duration, note FROM sessions').all();
};

export const getAppUsageRowsBySessionId = (db: database.Database, sessionId: string) => {
  return db.prepare('SELECT appName, appPath, duration FROM app_usage WHERE sessionId = ?').all(sessionId);
};

const createSeedSessions = (): SessionSave[] => {
  const second = 1000;
  const minute = 60;
  const now = Date.now();
  const buildSession = (
    startMinutesAgo: number,
    durationMinutes: number,
    note: string,
    appUsage: AppUsageRow[],
  ): SessionSave => {
    const startTime = now - startMinutesAgo * minute * second;
    const duration = durationMinutes * minute;

    return {
      startTime,
      endTime: startTime + duration * second,
      duration,
      note,
      appUsage,
    };
  };

  return [
    buildSession(24 * 60 + 90, 45, 'Deep work on session layouts', [
      { appName: 'Visual Studio Code', duration: 33 * minute },
      { appName: 'Safari', duration: 12 * minute },
    ]),
    buildSession(12 * 60 + 35, 30, 'Polished metrics and notes UI', [
      { appName: 'Visual Studio Code', duration: 21 * minute },
      { appName: 'Figma', duration: 9 * minute },
    ]),
    buildSession(3 * 60 + 20, 50, 'Refined timer behavior and flow', [
      { appName: 'Visual Studio Code', duration: 38 * minute },
      { appName: 'Google Chrome', duration: 12 * minute },
    ]),
  ];
};

export const seedSessionsIfEmpty = (db: database.Database): boolean => {
  const existingCount = db.prepare('SELECT COUNT(*) as count FROM sessions').get() as { count: number };
  if (existingCount.count > 0) {
    return false;
  }

  const seedSessions = createSeedSessions();
  const insertMany = db.transaction((sessions: SessionSave[]) => {
    for (const session of sessions) {
      insertSession(db, session);
    }
  });

  insertMany(seedSessions);
  return true;
};
