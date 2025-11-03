import fs from 'fs/promises'
import path from 'path'
import {log} from "@/front-end/libs/Logger";

export class FileManager {
    private fileName: string
    private filePath: string
    private fullPath: string

    constructor(fileName: string, filePath: string) {
        this.fileName = fileName
        this.filePath = filePath
        this.fullPath = path.join(filePath, fileName)
    }

    /**
     * Читає вміст файлу
     * @returns Вміст файлу у вигляді рядка
     */
    async read(): Promise<string> {
        try {
            log('Відкриваю файл для читання ')
            const data = await fs.readFile(this.fullPath, 'utf-8')

            return data
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                throw new Error(`Файл не знайдено: ${this.fullPath}`)
            }
            throw new Error(`Помилка читання файлу: ${(error as Error).message}`)
        }
    }

    /**
     * Записує дані в файл (додає до існуючого вмісту)
     * @param content Вміст для запису
     */
    async write(content: string): Promise<void> {
        try {
            // Переконуємось, що директорія існує
            await fs.mkdir(this.filePath, { recursive: true })

            // Додаємо контент до файлу
            await fs.appendFile(this.fullPath, content, 'utf-8')
        } catch (error) {
            throw new Error(`Помилка запису в файл: ${(error as Error).message}`)
        }
    }

    /**
     * Перезаписує файл (видаляє старий вміст і записує новий)
     * @param content Новий вміст файлу
     */
    async overwrite(content: string): Promise<void> {
        try {
            // Переконуємось, що директорія існує
            await fs.mkdir(this.filePath, { recursive: true })

            // Перезаписуємо файл
            await fs.writeFile(this.fullPath, content, 'utf-8')
        } catch (error) {
            throw new Error(`Помилка перезапису файлу: ${(error as Error).message}`)
        }
    }

    /**
     * Перевіряє, чи файл існує. Якщо не існує - створює його
     * @returns true якщо файл існував, false якщо був створений новий
     */
    async exists(): Promise<boolean> {
        try {
            await fs.access(this.fullPath)
            return true
        } catch {
            log(`Файлу за шляхом ${this.fullPath} не існує. Створюю новий файл...`)

            // Створюємо директорію, якщо не існує
            await fs.mkdir(this.filePath, { recursive: true })

            // Створюємо порожній файл
            await fs.writeFile(this.fullPath, '', 'utf-8')
            log(`Файл за шляхом ${this.fullPath} створено`)

            return true
        }
    }

    /**
     * Видаляє файл
     */
    async delete(): Promise<void> {
        try {
            await fs.unlink(this.fullPath)
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                throw new Error(`Файл не знайдено: ${this.fullPath}`)
            }
            throw new Error(`Помилка видалення файлу: ${(error as Error).message}`)
        }
    }

    /**
     * Повертає повний шлях до файлу
     */
    getFullPath(): string {
        return this.fullPath
    }
}
