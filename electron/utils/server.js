const path = require('path');
const { app } = require('electron');
const http = require('http');

let serverInstance = null;

async function startNextServer() {
    const isDev = !app.isPackaged;

    if (isDev) {
        console.log('Development mode - using external Next.js server');
        return null;
    }

    try {
        console.log('Starting Next.js production server...');

        // Шлях до Next.js в упакованому додатку
        const appPath = path.join(process.resourcesPath, 'app');

        console.log('App path:', appPath);
        console.log('Process resourcesPath:', process.resourcesPath);

        // Змінюємо робочу директорію
        process.chdir(appPath);
        process.env.NODE_ENV = 'production';

        // Завантажуємо Next.js з упакованих node_modules
        const nextPath = path.join(appPath, 'node_modules', 'next');
        console.log('Loading Next.js from:', nextPath);

        const next = require(nextPath);

        const nextApp = next({
            dev: false,
            dir: appPath,
            conf: {
                distDir: '.next'
            }
        });

        const handle = nextApp.getRequestHandler();

        console.log('Preparing Next.js...');
        await nextApp.prepare();
        console.log('Next.js prepared successfully');

        // Створюємо HTTP сервер
        const server = http.createServer((req, res) => {
            handle(req, res);
        });

        await new Promise((resolve, reject) => {
            server.listen(3333, (err) => {
                if (err) {
                    console.error('Server listen error:', err);
                    reject(err);
                } else {
                    console.log('✓ Next.js server ready on http://localhost:3333');
                    resolve();
                }
            });
        });

        serverInstance = { nextApp, server };
        return serverInstance;

    } catch (error) {
        console.error('Failed to start Next.js server:', error);
        console.error('Error stack:', error.stack);
        throw error;
    }
}

function stopNextServer() {
    if (serverInstance) {
        console.log('Stopping Next.js server...');
        if (serverInstance.server) {
            serverInstance.server.close();
        }
        serverInstance = null;
    }
}

module.exports = { startNextServer, stopNextServer };