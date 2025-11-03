import {TimerForm} from "@/front-end/types/forms.type";

export function getEndTime(timer: TimerForm): Date {
    const now = new Date()
    const totalMs =
        (timer.hours * 3600 + timer.minutes * 60 + timer.seconds) * 1000
    return new Date(now.getTime() + totalMs)
}

export function startCountdown(
    endedAt: string
): TimerForm {
    const now = Date.now();
    const end = new Date(endedAt).getTime();

    const diff = Math.max(0, end - now); // мс
    const totalSeconds = Math.floor(diff / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds };
}



