import path from 'path';
import { app, BrowserWindow } from 'electron';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    // frame: 0,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
});
