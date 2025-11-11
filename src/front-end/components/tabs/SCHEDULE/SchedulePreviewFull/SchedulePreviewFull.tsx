'use client'
import s from './SchedulePreviewFull.module.css'
import {ScheduleConfigType} from "@/front-end/configs/schedule.config";
import {RegionsScheduleType} from "@/front-end/libs/ProcessingSchedule/types";
import clsx from "clsx";
import {formatedDate} from "@/front-end/utils/formatedDate";

// Окремий компонент таблиці
function ScheduleTable({
                           config,
                           filter,
                           targetDate
                       }: {
    config: ScheduleConfigType,
    filter: string,
    targetDate: string // Формат: 'YYYY-MM-DD'
}) {
    let schedule = config.data?.regions.filter((reg) => {
        return reg.cpu === filter;
    })[0]!

    if (!schedule?.schedule) {
        return <p>No schedule found.</p>
    }

    schedule.times = extractHours(schedule, targetDate)
    schedule.queue = extractQueues(schedule)

    return (
        <div className={s.table}>
            <div className={s.head}>
                <div className={s.line}>
                    <div className={clsx(s.item, s.main)}>
                        <span>Черга</span>
                        <span>Години</span>
                    </div>
                    {schedule.queue.map((item, index) => {
                        return (
                            <div className={s.item} key={index}>
                                <span>{item}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={s.body}>
                {
                    schedule.times.map((time, indexTime) => {
                        return (
                            <div className={s.line} key={indexTime}>
                                <div className={clsx(s.item)}>
                                    <span>{time}</span>
                                    <span>--</span>
                                    <span>{schedule.times![indexTime + 1] ?? '24:00'}</span>
                                </div>
                                {
                                    schedule.queue!.map((queue, indexQueue) => {
                                        const scheduleValue = schedule.schedule?.[queue]?.[targetDate]?.[time]
                                        const cls = scheduleValue === 0 ?
                                            s.sc_none : scheduleValue === 1 ?
                                                s.sc_true : s.sc_false
                                        return (
                                            <div className={clsx(s.item, cls)} key={indexQueue}>
                                                {scheduleValue ?? '-'}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

// Основний компонент
export default function SchedulePreviewFull({
                                                config,
                                                targetDate,
                                                filter
                                            }: {
    config: ScheduleConfigType,
    filter: string,
    targetDate: string,
}) {

    return (
        <>
            <div className={s.preview}>
                {/*<h3>Сьогодні ({targetDate})</h3>*/}
                <ScheduleTable
                    config={config}
                    filter={filter}
                    targetDate={targetDate}
                />
            </div>
        </>
    )
}

// Оновлена функція extractHours - тепер приймає targetDate
function extractHours(schedule: RegionsScheduleType, targetDate: string): string[] {
    const hoursSet = new Set<string>();

    for (const queueKey in schedule.schedule) {
        const typedQueueKey = queueKey as keyof typeof schedule.schedule;
        const datesObj = schedule.schedule[typedQueueKey];

        // Беремо години тільки для конкретної дати
        if (datesObj[targetDate]) {
            Object.keys(datesObj[targetDate]).forEach(hour => hoursSet.add(hour));
        }
    }

    return Array.from(hoursSet).sort();
}

function extractQueues(schedule: RegionsScheduleType): string[] {
    if (!schedule.schedule) return [];
    return Object.keys(schedule.schedule);
}