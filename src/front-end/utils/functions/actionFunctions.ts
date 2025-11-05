// Закриття додатку < Обробник для кнопки>
export const handleClose = () => {
    window.electronAPI?.closeApp();
};

// Зміна розміру екрану < Обробник для кнопки>
export const handleResize = () => {
    window.electronAPI?.toggleMaximize();
};