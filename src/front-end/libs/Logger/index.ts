import {fileLogsConfig} from "@/front-end/configs/file.logs.config";


export function log(message: string, file?: fileLogsConfig) {
    void fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message,file }),
    })
        .then(res => {
            if (!res.ok) {
                console.error(`[log] Failed to send log: ${res.status} ${res.statusText}`)
            }
        })
        .catch(err => {
            console.error('[log] Network or fetch error:', err)
        })
}


