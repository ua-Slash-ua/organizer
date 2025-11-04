export function formatedDate(timestamp: number, format: string = 'DD.MM.YYYY HH:mm'): string {
    const date = new Date(timestamp);

    const map = {
        DD: String(date.getDate()).padStart(2, '0'),
        MM: String(date.getMonth() + 1).padStart(2, '0'),
        YYYY: String(date.getFullYear()),
        YY: String(date.getFullYear()).slice(-2),
        HH: String(date.getHours()).padStart(2, '0'),
        mm: String(date.getMinutes()).padStart(2, '0'),
        ss: String(date.getSeconds()).padStart(2, '0'),
    } as const;

    type Token = keyof typeof map;

    return format.replace(/DD|MM|YYYY|YY|HH|mm|ss/g, (match) => map[match as Token]);
}

