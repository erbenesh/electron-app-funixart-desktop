import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
  // Add safe IPC methods here as needed
  // Example:
  // invoke: (channel: string, ...args: any[]) => {
  //   const validChannels = ['some-channel'];
  //   if (validChannels.includes(channel)) {
  //     return ipcRenderer.invoke(channel, ...args);
  //   }
  // },
});

// Type definitions for window object (to be used in renderer)
export interface ElectronAPI {
  platform: NodeJS.Platform;
  versions: {
    node: string;
    chrome: string;
    electron: string;
  };
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

