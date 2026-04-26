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
      duration INTEGER NOT NULL,
      FOREIGN KEY (sessionId) REFERENCES sessions(id) ON DELETE CASCADE
    );
  `);

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
    INSERT INTO app_usage (sessionId, appName, duration)
    VALUES (@sessionId, @appName, @duration);
  `);

  const insertSessionTransaction = db.transaction((session: SessionSave) => {
    insertSessionStmt.run(insertedSession);

    for (const appUsage of session.appUsage) {
      insertAppUsageStmt.run({
        sessionId: insertedSession.id,
        appName: appUsage.appName,
        duration: appUsage.duration,
      });
    }
  });

  insertSessionTransaction(session);
};

export const getSessionRows = (db: database.Database) => {
  return db.prepare('SELECT id, startTime, endTime, duration, note FROM sessions').all();
};

export const getAppUsageRowsBySessionId = (db: database.Database, sessionId: string) => {
  return db.prepare('SELECT appName, duration FROM app_usage WHERE sessionId = ?').all(sessionId);
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
