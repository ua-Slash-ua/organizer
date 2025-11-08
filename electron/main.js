const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { startNextServer, stopNextServer } = require("./utils/server");
const registerWindowHandlers = require("./ipc/window");
const registerDevtoolsHandlers = require("./ipc/devtools");
require("dotenv").config();

let win;
let nextServer;

async function createWindow() {
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
    await win.loadURL(startURL);

    win.on("maximize", () => win.webContents.send("window-maximized", true));
    win.on("unmaximize", () => win.webContents.send("window-maximized", false));

    registerWindowHandlers(win);
    registerDevtoolsHandlers(win);

    if (!app.isPackaged) {
        win.webContents.openDevTools();
    }
}

ipcMain.on("move-window", (event, { dx, dy }) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;
    const bounds = win.getBounds();
    win.setBounds({
        x: bounds.x + dx,
        y: bounds.y + dy,
        width: bounds.width,
        height: bounds.height,
    });
});

app.whenReady().then(async () => {
    nextServer = await startNextServer();
    await createWindow();
});

app.on("window-all-closed", () => {
    stopNextServer(nextServer);
    if (process.platform !== "darwin") app.quit();
});
