import path from "path";
import * as fs from "fs";

export class Logger {
    public file: string = 'log.log'
    public basePath: string = 'logs'

    public pathToLog: string

    constructor(
        file?: string,
    basePath?: string
    ) {
        this.file = file?? this.file
        this.basePath =  basePath?? this.basePath
        this.pathToLog = path.join(process.cwd(), this.basePath, this.file)
    }

    public ensureDir() {
        if (!fs.existsSync(path.dirname(this.pathToLog))) {
            fs.mkdirSync(path.dirname(this.pathToLog), { recursive: true })
        }
    }




    public openFile() {
        this.ensureDir()
        return fs.createWriteStream(this.pathToLog, { flags: 'a' })
    }

    public logWrite(message: string) {
        const stream = this.openFile()
        const timestamp = new Date().toISOString()
        stream.write(`[${timestamp}] ${message}\n`)
        stream.end()
    }


}



