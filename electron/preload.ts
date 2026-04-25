// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import { ContextBridgeName, Session } from './types';

contextBridge.exposeInMainWorld(ContextBridgeName.API, {
  saveSession: (session: Session) => ipcRenderer.send('save-session', session),
  loadSessions: () => ipcRenderer.invoke('load-sessions'),
  resolveAppIcon: (appName: string) => ipcRenderer.invoke('resolve-app-icon', appName),
});
