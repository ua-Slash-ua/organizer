// main.js
const { app, BrowserWindow } = require("electron");
const path = require("path");
const { startNextServer, stopNextServer } = require("./utils/server");
const registerWindowHandlers = require("./ipc/window");
const registerDevtoolsHandlers = require("./ipc/devtools");
require("dotenv").config();

let win;
let nextServer;

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    const startURL = process.env.BASE_URL || "http://localhost:3333";
    win.loadURL(startURL);

    win.on("maximize", () => win.webContents.send("window-maximized", true));
    win.on("unmaximize", () => win.webContents.send("window-maximized", false));

    // ✅ Реєстрація обробників ТІЛЬКИ після створення win
    registerWindowHandlers(win);
    registerDevtoolsHandlers(win);
}

app.whenReady().then(() => {
    nextServer = startNextServer();
    // викликаємо createWindow після старту Next
    setTimeout(createWindow, 3333);
});

app.on("window-all-closed", () => {
    stopNextServer(nextServer);
    if (process.platform !== "darwin") app.quit();
});
