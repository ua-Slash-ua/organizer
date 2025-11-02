

export function log(message: string) {
    void fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
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


