// server-side action
'use server'
import { FileManager } from "@/front-end/libs/FileManager/fileManager";
import {ProcessingConfigType} from "@/front-end/libs/ProcessingConfig/types";

export async function getConfig(filename: string, fileFolder: string) {
    const manager = new FileManager(filename, fileFolder);

    try {
        await manager.exists();
        const data = await manager.read();
        return JSON.parse(data);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error('Помилка читання конфігурації:', message);
        return null;
    }
}

export async function saveConfig(filename: string, fileFolder: string, config: ProcessingConfigType):Promise<boolean> {
    const manager = new FileManager(filename, fileFolder);

    try {
        await manager.exists();
        await manager.overwrite(JSON.stringify(config, null, 2));
        return true;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error('Помилка читання конфігурації:', message);
        return false;
    }
}
