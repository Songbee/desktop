import electron, { app, BrowserWindow, Menu, Tray } from "electron";
import path from "path";
import url from "url";

import Manager from "./backend";
global.backend = new Manager();

let mainWindow, tray; // keep a reference

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (!mainWindow.isVisible()) mainWindow.show();
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

if (shouldQuit) app.quit();


function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    autoHideMenuBar: true,
  });
  mainWindow.once("ready-to-show", () => mainWindow.show());

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "frontend/index.html"),
    protocol: "file:",
    slashes: true,
  }));

  mainWindow.on("close", (event) => {
    event.preventDefault();
    mainWindow.hide();
  });
}

app.on("ready", () => {
  tray = new Tray(path.join(__dirname, "res/icon.png"));
  const trayMenu = Menu.buildFromTemplate([
    { role: 'quit' },
  ]);
  tray.setToolTip("~Songbee!!!!!!!");
  tray.setContextMenu(trayMenu);

  createWindow();

  tray.on("click", () => {
    mainWindow.show();
  });
});

app.on("window-all-closed", () => {
  // No-op. We listen for this event so that Electron doesn't exit.
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

app.on("will-quit", () => {
  global.backend.quit();
});
