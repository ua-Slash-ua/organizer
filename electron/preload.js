const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    closeApp: () => ipcRenderer.send('app-close'),
    toggleMaximize: () => ipcRenderer.send('toggle-maximize'),
    onMaximizeChange: (callback) => ipcRenderer.on('window-maximized', (_, state) => callback(state)),

    // DevTools
    openDevTools: () => ipcRenderer.send('open-devtools'),
    closeDevTools: () => ipcRenderer.send('close-devtools'),
    isDevToolsOpen: () => ipcRenderer.invoke('is-devtools-open'),

    // Переміщення вікна
    moveWindow: (dx, dy) => ipcRenderer.send('move-window', { dx, dy })
});
