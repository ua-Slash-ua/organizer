//devtools.js


const { ipcMain } = require("electron");

module.exports = (win) => {
    ipcMain.on('open-devtools', () => {
        if (win && !win.webContents.isDevToolsOpened()) {
            win.webContents.openDevTools({ mode: 'right' });
        }
    });

    ipcMain.on('close-devtools', () => {
        if (win && win.webContents.isDevToolsOpened()) {
            win.webContents.closeDevTools();
        }
    });

    ipcMain.handle('is-devtools-open', () => {
        return win ? win.webContents.isDevToolsOpened() : false;
    });
};
