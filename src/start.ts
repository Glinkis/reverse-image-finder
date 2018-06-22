import { app, BrowserWindow } from "electron";
import { enableLiveReload } from "electron-compile";
import { autoUpdater } from "electron-updater";
import installExtension, {
  REACT_DEVELOPER_TOOLS
} from "electron-devtools-installer";
import * as url from "url";
import * as path from "path";

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload({ strategy: "react-hmr" });
}

let win: BrowserWindow | null;

async function createWindow() {
  win = new BrowserWindow({
    width: isDevMode ? 1000 : 500,
    height: 500,
    title: "Reverse Image Finder"
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "./index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    win.webContents.openDevTools();
  }

  win.on("closed", () => {
    win = null;
  });
}

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
