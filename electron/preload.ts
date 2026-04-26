// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { SessionSave } from '@shared/types';
import { contextBridge, ipcRenderer } from 'electron';
import { ContextBridgeName } from './types';

contextBridge.exposeInMainWorld(ContextBridgeName.API, {
  saveSession: (session: SessionSave) => ipcRenderer.send('save-session', session),
  loadSessions: () => ipcRenderer.invoke('load-sessions'),
  resolveAppIcon: (appName: string) => ipcRenderer.invoke('resolve-app-icon', appName),
});
