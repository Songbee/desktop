import electron, { app, BrowserWindow } from "electron";
import path from "path";
import url from "url";

import Manager from "./backend";
global.backend = new Manager();

let mainWindow; // keep a reference

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
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
    autoHideMenuBar: true
  });
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "frontend/index.html"),
    protocol: "file:",
    slashes: true,
  }));

  mainWindow.on("closed", () => {
    // Dereference the window object.
    mainWindow = null;
  });
}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

app.on("will-quit", () => {
  global.backend.quit();
});
