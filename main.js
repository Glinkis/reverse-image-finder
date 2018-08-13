const {
  app,
  BrowserWindow,
  Menu
} = require("electron");
require('electron-reload')(__dirname)

const isDevMode = process.execPath.match(/[\\/]electron/);

const createWindow = () => {
  win = new BrowserWindow({
    width: isDevMode ? 1500 : 1000,
    height: isDevMode ? 1000 : 500,
    title: "Reverse Image Finder",
  });

  win.loadURL(`file://${__dirname}/app/index.html`);

  win.on("closed", () => {
    win = null;
  });

  if (isDevMode) {
    win.webContents.openDevTools();
    return;
  };

  const menu = Menu.buildFromTemplate([{
    label: 'Menu',
    submenu: [{
        label: 'Open Devtools',
        accelerator: "Command+D",
        click() {
          win.webContents.openDevTools();
        }
      },
      {
        label: "Quit",
        accelerator: "Command+Q",
        click: function () {
          app.quit();
        }
      }
    ]
  }])

  Menu.setApplicationMenu(menu);
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