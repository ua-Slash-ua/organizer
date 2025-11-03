
'use server'

import { FileManager } from "@/front-end/libs/FileManager/fileManager"

export async function getTimerConfig() {
    const fileManager = new FileManager('timer.config.json', 'data-base')
    try {
        await fileManager.exists()
        const data = await fileManager.read()
        return JSON.parse(data)
    } catch (error) {
        console.error('Помилка читання конфігурації:', error)
        return null
    }
}

export async function saveTimerConfig(config: never) {
    const fileManager = new FileManager('timer.config.json', 'data-base')

    try {
        await fileManager.overwrite(JSON.stringify(config, null, 2))
        return { success: true }
    } catch (error) {
        console.error('Помилка збереження конфігурації:', error)
        return { success: false, error: (error as Error).message }
    }
}

export async function updateTimerConfig(config: never) {
    const fileManager = new FileManager('timer.config.json', 'data-base')

    try {
        await fileManager.write(JSON.stringify(config, null, 2))
        return { success: true }
    } catch (error) {
        console.error('Помилка оновлення конфігурації:', error)
        return { success: false, error: (error as Error).message }
    }
}