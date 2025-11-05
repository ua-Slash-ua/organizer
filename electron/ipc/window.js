//window.js


const { ipcMain } = require("electron");

module.exports = (win) => {
    ipcMain.on("app-close", () => win?.close());
    ipcMain.on("toggle-maximize", () => {
        if (!win) return;
        win.isMaximized() ? win.unmaximize() : win.maximize();
    });
};
