export {};

declare global {
    interface Window {
        electronAPI?: {
            closeApp: () => void;
            toggleMaximize: () => void;
            onMaximizeChange: (callback: (isMaximized: boolean) => void) => void;

            openDevTools: () => void;
            closeDevTools: () => void;
            isDevToolsOpen: () => Promise<boolean>;
        };
    }
}
