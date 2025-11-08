import {TimerForm} from "@/front-end/types/forms.type";

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

export function actionFormatedTime(
    date: Date = new Date(),
    timer: {
        hours: number;
        minutes: number;
        seconds: number;
    },
    action: '-' | '+' = '+'
): Date {
    const result = new Date(date);

    const ms =
        ((timer.hours * 60 + timer.minutes) * 60 + timer.seconds) * 1000;

    if (action === '+') {
        result.setTime(result.getTime() + ms);
    } else {
        result.setTime(result.getTime() - ms);
    }

    return result;
}

export function getDateDifference(date1:Date, date2:Date, format: boolean = false):string | TimerForm {
    // Перетворюємо дати на об'єкти Date
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Різниця в мілісекундах
    let diff: number = Math.abs(+d2 - +d1);
    if (format) {
        // Повертаємо як об'єкт {hours, minutes, seconds}
        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * 1000 * 60 * 60;

        const minutes = Math.floor(diff / (1000 * 60));
        diff -= minutes * 1000 * 60;

        const seconds = Math.floor(diff / 1000);

        return { hours, minutes, seconds };
    } else {
        // Повертаємо у вигляді ISO рядка (Danr.isoToString)
        // Припустимо, що Danr.isoToString просто повертає ISO рядок
        const totalSeconds = Math.floor(diff / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');

        return new Date(diff).toISOString();
    }
}


export function getDateSum(date1: Date, date2: Date, format: boolean = false): string | TimerForm {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Різниця між датами у мілісекундах
    const diff = Math.abs(+d2 - +d1);

    // Менша дата
    const minDate = d1 < d2 ? d1 : d2;

    // Додаємо різницю до меншої
    const sumDate = new Date(minDate.getTime() + diff);

    if (format) {
        const hours = sumDate.getUTCHours();
        const minutes = sumDate.getUTCMinutes();
        const seconds = sumDate.getUTCSeconds();

        return { hours, minutes, seconds };
    }

    return sumDate.toISOString();
}

