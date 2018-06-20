import { app, BrowserWindow } from "electron";
import * as url from "url";
import * as path from "path";

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    width: 500,
    height: 500
  });

  win.setMenu(null);
  win.setResizable(false);

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "./src/index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

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
