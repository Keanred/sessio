import { app } from 'electron';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { basename } from 'node:path';
import {
  getAppUsageRowsBySessionId,
  getAverageSessionDuration,
  getSessionRows,
  getTodaysSessionDuration,
  getTodaysTopApp,
  insertSession,
  SessionRow,
} from './db';
import { db } from './main';
import { AppUsage, Session, SessionSave } from './types';

export const isAppUsage = (value: unknown): value is AppUsage => {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.appName === 'string' &&
    typeof v.duration === 'number' &&
    (v.appPath === undefined || typeof v.appPath === 'string')
  );
};

export const isSession = (value: unknown): value is Session => {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    typeof v.startTime === 'number' &&
    typeof v.endTime === 'number' &&
    typeof v.duration === 'number' &&
    (v.note === undefined || typeof v.note === 'string') &&
    Array.isArray(v.appUsage) &&
    (v.appUsage as unknown[]).every(isAppUsage)
  );
};

export const isSessionSave = (value: unknown): value is SessionSave => {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.startTime === 'number' &&
    typeof v.endTime === 'number' &&
    typeof v.duration === 'number' &&
    (v.note === undefined || typeof v.note === 'string') &&
    Array.isArray(v.appUsage) &&
    (v.appUsage as unknown[]).every(isAppUsage)
  );
};

const isSessionRow = (value: unknown): value is SessionRow => {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    typeof v.startTime === 'number' &&
    typeof v.endTime === 'number' &&
    typeof v.duration === 'number' &&
    (v.note === null || typeof v.note === 'string')
  );
};

const formSession = (session: Session): Session => {
  return {
    id: session.id,
    startTime: session.startTime,
    endTime: session.endTime,
    duration: session.duration,
    note: session.note,
    appUsage: session.appUsage.map((usage) => ({
      appName: usage.appName,
      duration: usage.duration,
      appPath: usage.appPath,
    })),
  };
};

const formAppUsage = (usage: AppUsage): AppUsage => {
  return {
    appName: usage.appName,
    duration: usage.duration,
    appPath: usage.appPath,
  };
};

const normalizeBundlePathFromExecutablePath = (appPath: string): string => {
  const bundleMatch = appPath.match(/^(.*\.app)(?:\/|$)/i);
  return bundleMatch?.[1] ?? appPath;
};

export const handleSaveSession = (session: unknown): void => {
  if (!isSessionSave(session)) {
    throw new Error('Invalid session payload received by main process');
  }

  insertSession(db, session);
};

export const handleLoadSessions = (): Session[] => {
  const sessionRows = getSessionRows(db);

  return sessionRows.map((sessionRow) => {
    if (!isSessionRow(sessionRow)) {
      throw new Error(`Invalid session row: ${JSON.stringify(sessionRow)}`);
    }

    const appUsageRows = getAppUsageRowsBySessionId(db, sessionRow.id);
    if (!Array.isArray(appUsageRows) || !appUsageRows.every(isAppUsage)) {
      throw new Error(`Invalid app usage rows for session ${sessionRow.id}: ${JSON.stringify(appUsageRows)}`);
    }

    return formSession({
      id: sessionRow.id,
      startTime: sessionRow.startTime,
      endTime: sessionRow.endTime,
      duration: sessionRow.duration,
      note: sessionRow.note ?? undefined,
      appUsage: appUsageRows.map(formAppUsage),
    });
  });
};

const toAppBundlePathCandidates = (appName: string): string[] => {
  const normalizedName = appName.endsWith('.app') ? appName.slice(0, -4) : appName;
  const userApplications = `${homedir()}/Applications`;

  return [
    `/Applications/${normalizedName}.app`,
    `/Applications/Utilities/${normalizedName}.app`,
    `/System/Applications/${normalizedName}.app`,
    `/System/Applications/Utilities/${normalizedName}.app`,
    `${userApplications}/${normalizedName}.app`,
    `${userApplications}/Utilities/${normalizedName}.app`,
  ];
};

const normalizeAppName = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/\.app$/i, '')
    .replace(/[^a-z0-9]/g, '');
};

const escapeSpotlightQueryValue = (value: string): string => {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
};

const scoreBundlePath = (bundlePath: string, appName: string): number => {
  const normalizedTarget = normalizeAppName(appName);
  const bundleName = basename(bundlePath, '.app');
  const normalizedBundleName = normalizeAppName(bundleName);

  if (normalizedBundleName === normalizedTarget) {
    return 3;
  }

  if (normalizedBundleName.includes(normalizedTarget) || normalizedTarget.includes(normalizedBundleName)) {
    return 2;
  }

  return 1;
};

const searchAppBundlePaths = (appName: string): string[] => {
  const escapedName = escapeSpotlightQueryValue(appName.trim());
  const query =
    `kMDItemContentTypeTree == "com.apple.application-bundle" && (` +
    `kMDItemDisplayName ==[c] "${escapedName}" || ` +
    `kMDItemFSName ==[c] "${escapedName}.app" || ` +
    `kMDItemFSName ==[c] "*${escapedName}*.app")`;

  const searchRoots = ['/Applications', '/System/Applications', `${homedir()}/Applications`];
  const bundlePaths = new Set<string>();

  for (const root of searchRoots) {
    try {
      const stdout = execFileSync('mdfind', ['-onlyin', root, query], { encoding: 'utf8' });
      const resultPaths = stdout
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.endsWith('.app') && existsSync(line));

      for (const resultPath of resultPaths) {
        bundlePaths.add(resultPath);
      }
    } catch {
      // Ignore search failures and keep trying other roots.
    }
  }

  return Array.from(bundlePaths).sort((leftPath, rightPath) => {
    return scoreBundlePath(rightPath, appName) - scoreBundlePath(leftPath, appName);
  });
};

export const handleResolveAppIcon = async (appName: string, appPath?: string): Promise<string | null> => {
  if (typeof appName !== 'string' || appName.trim().length === 0) {
    return null;
  }

  if (typeof appPath === 'string' && appPath.trim().length > 0) {
    const candidatePath = normalizeBundlePathFromExecutablePath(appPath.trim());

    if (existsSync(candidatePath)) {
      try {
        const iconImage = await app.getFileIcon(candidatePath, { size: 'small' });
        if (!iconImage.isEmpty()) {
          return iconImage.toDataURL();
        }
      } catch {
        // Fallback to name-based search below.
      }
    }
  }

  const normalizedAppName = appName.trim();
  const directCandidatePaths = toAppBundlePathCandidates(normalizedAppName).filter((candidatePath) =>
    existsSync(candidatePath),
  );
  const spotlightResultPaths = searchAppBundlePaths(normalizedAppName);
  const bundlePath = [...directCandidatePaths, ...spotlightResultPaths].find((candidatePath) =>
    existsSync(candidatePath),
  );

  if (!bundlePath) {
    return null;
  }

  try {
    const iconImage = await app.getFileIcon(bundlePath, { size: 'small' });
    return iconImage.isEmpty() ? null : iconImage.toDataURL();
  } catch {
    return null;
  }
};

export const handleTotalFocusTimeToday = (): number => {
  const totalDuration = getTodaysSessionDuration(db);
  return totalDuration;
};

export const handleAverageSessionDuration = (): number => {
  const averageDuration = getAverageSessionDuration(db);
  return averageDuration;
};

export const handleTodaysTopApp = (): { appName: string; totalDuration: number } | null => {
  return getTodaysTopApp(db);
};

export const handleGetAverageSessionDuration = (): number => {
  return getAverageSessionDuration(db);
};
