// client-side facade
import {
    getConfig as serverGetConfig,
    saveConfig as serverSaveConfig
} from "@/front-end/libs/ProcessingConfig/ServerActions";
import {ProcessingConfigType} from "@/front-end/libs/ProcessingConfig/types";

export class ProcessingConfig {
    private fileName: string;
    private fileFolder: string = 'data-base';

    constructor(fileName: string, fileFolder?: string) {
        this.fileName = fileName;
        this.fileFolder = fileFolder ?? this.fileFolder;
    }

    /** Перевірка середовища */
    isServer(): boolean {
        return typeof window === 'undefined';
    }

    /** Отримати конфігурацію */
    public getConfig(): Promise<any> {
        return serverGetConfig(this.fileName, this.fileFolder);
    }
    /** Отримати конфігурацію */
    public saveConfig(config:ProcessingConfigType): Promise<any> {
        return serverSaveConfig(this.fileName, this.fileFolder, config);
    }
}
