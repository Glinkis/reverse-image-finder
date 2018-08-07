const {
  app,
  BrowserWindow
} = require("electron");
const {
  autoUpdater
} = require("electron-updater");
require('electron-reload')(__dirname)

const isDevMode = process.execPath.match(/[\\/]electron/);

const createWindow = () => {
  win = new BrowserWindow({
    width: isDevMode ? 1000 : 500,
    height: 500,
    title: "Reverse Image Finder"
  });

  win.loadURL(`file://${__dirname}/build/index.html`);

  if (isDevMode) {
    win.webContents.openDevTools();
  }

  win.on("closed", () => {
    win = null;
  });
};

app.on("ready", () => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});