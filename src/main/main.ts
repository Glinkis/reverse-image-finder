import { app, BrowserWindow } from "electron";
import { format } from "url";
import * as path from "path";
require("electron-reload")(__dirname);

const isDevelopment = process.env.NODE_ENV !== "production";

let win: BrowserWindow | null;

const createWindow = () => {
  win = new BrowserWindow({
    width: isDevelopment ? 1000 : 500,
    height: 500,
    title: "Reverse Image Finder"
  });

  if (isDevelopment) {
    win.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    win.loadURL(
      format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
      })
    );
  }

  win.webContents.openDevTools();

  win.on("closed", () => {
    win = null;
  });
};

app.on("ready", () => {
  createWindow();
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
