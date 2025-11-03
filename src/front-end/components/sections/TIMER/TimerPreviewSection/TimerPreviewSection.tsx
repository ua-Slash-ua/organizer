'use client'

import {useEffect, useState, useRef} from 'react'
import s from './TimerPreviewSection.module.css'
import {log} from '@/front-end/libs/Logger'
import {TimerConfigType} from '@/front-end/configs/timer.config'
import {fetchTimerConfig, saveTimer} from '@/front-end/api/timer.client'
import {startCountdown} from "@/front-end/components/sections/TIMER/functions"
import {TimerForm} from "@/front-end/types/forms.type"

export default function TimerPreviewSection({timerFull, update, pause}: {
    timerFull: TimerForm,
    update: boolean,
    pause: boolean
}) {
    const [config, setConfig] = useState<TimerConfigType | null>(null)
    const [timer, setTimer] = useState<TimerForm>(timerFull)
    const [loaded, setLoaded] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        fetchTimerConfig()
            .then((data) => {
                if (!data) throw new Error('Config is empty')
                setConfig(data)

                // Якщо таймер на паузі - розраховуємо залишок часу з урахуванням паузи
                if (data.started_timer.start === 'pause' && data.started_timer.endedAt && data.started_timer.pauseAt) {
                    const endTime = new Date(data.started_timer.endedAt).getTime()
                    const pauseTime = new Date(data.started_timer.pauseAt).getTime()
                    const remainingTime = endTime - pauseTime

                    // Конвертуємо мілісекунди в години/хвилини/секунди
                    const hours = Math.floor(remainingTime / (1000 * 60 * 60))
                    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
                    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)

                    setTimer({ hours, minutes, seconds })
                } else {
                    setTimer(data.started_timer.start_config)
                }

                // Встановлюємо локальний стан паузи з конфігу
                setIsPaused(data.started_timer.start === 'pause')
                setLoaded(true)
            })
            .catch(() => {
                log('Помилка завантаження конфігу < timer.config >')
            })
    }, [update])

    // Оновлення таймера зовні
    useEffect(() => {
        setTimer(timerFull)
    }, [timerFull])

    // Обробка паузи
    useEffect(() => {
        if (!config) return

        const handlePause = async () => {
            const {started_timer} = config

            // Якщо поставили на паузу
            if (pause && started_timer.start === 'start') {
                const updated: TimerConfigType = {
                    started_timer: {
                        ...started_timer,
                        start: 'pause',
                        pauseAt: new Date().toISOString(),
                    },
                }
                await saveTimer(updated)
                setConfig(updated)
                log('[PAUSE] Таймер на паузі', 'timer.log')
                return
            }

            // Якщо зняли з паузи
            if (!pause && started_timer.pauseAt && started_timer.start === 'pause') {
                const now = Date.now()
                const endTime = new Date(started_timer.endedAt).getTime()
                const pauseTime = new Date(started_timer.pauseAt).getTime()
                const pausedDuration = now - pauseTime

                const updated: TimerConfigType = {
                    started_timer: {
                        ...started_timer,
                        start: 'start',
                        pauseAt: '',
                        endedAt: new Date(endTime + pausedDuration).toISOString(),
                    },
                }
                await saveTimer(updated)
                setConfig(updated)
                log('[CONTINUE] Продовжуємо', 'timer.log')
            }
        }

        handlePause()
    }, [pause, config?.started_timer.start])

    // Таймер зворотного відліку
    useEffect(() => {
        if (!loaded || !config) return

        // Зупинити попередній інтервал
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }

        // Не запускати, якщо не старт або пауза
        if (config.started_timer.start !== 'start') {
            return
        }

        // Перевірка валідності endedAt
        if (!config.started_timer.endedAt) return

        const endTime = new Date(config.started_timer.endedAt).getTime()
        if (isNaN(endTime)) return

        // Якщо час уже минув
        if (endTime <= Date.now()) {
            const updated: TimerConfigType = {
                started_timer: {
                    ...config.started_timer,
                    start: 'break',
                },
            }
            saveTimer(updated).then(() => {
                log('[Відпрацьовано] Таймер уже минув', 'timer.log')
                setConfig(updated)
                setTimeout(() => setTimer(config.started_timer.start_config), 1000)
            })
            return
        }

        // Запуск таймера
        const tick = () => {
            const time = startCountdown(config.started_timer.endedAt)
            setTimer(time)

            if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current)
                    intervalRef.current = null
                }

                const updated: TimerConfigType = {
                    started_timer: {
                        ...config.started_timer,
                        start: 'break',
                    },
                }
                saveTimer(updated).then(() => {
                    log('[Відпрацьовано] Таймер відпрацював', 'timer.log')
                    setConfig(updated)
                    setTimeout(() => setTimer(config.started_timer.start_config), 1000)
                })
            }
        }

        // Перший тік одразу
        tick()

        // Запуск інтервалу
        intervalRef.current = setInterval(tick, 1000)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [config, loaded])

    return (
        <section className={s.section}>
            {loaded && (
                <>
                    {timer.hours > 0 && (
                        <>
                            <TimerItem time={timer.hours} typeItem="hours"/>
                            <div className={s.replacer}>:</div>
                            <TimerItem time={timer.minutes} typeItem="minutes"/>
                            <div className={s.replacer}>:</div>
                            <TimerItem time={timer.seconds} typeItem="seconds"/>
                        </>
                    )}

                    {timer.hours === 0 && timer.minutes > 0 && (
                        <>
                            <TimerItem time={timer.minutes} typeItem="minutes"/>
                            <div className={s.replacer}>:</div>
                            <TimerItem time={timer.seconds} typeItem="seconds"/>
                        </>
                    )}

                    {timer.hours === 0 && timer.minutes === 0 && (
                        <TimerItem time={timer.seconds} typeItem="seconds"/>
                    )}
                </>
            )}
        </section>
    )
}

function TimerItem({time, typeItem}: { time: number; typeItem: string }) {
    const name =
        typeItem === 'hours' ? 'Години' :
            typeItem === 'minutes' ? 'Хвилини' :
                'Секунди'

    return (
        <div className={s.time}>
            <span>{time <= 9 ? `0${time}` : time}</span>
            <span className={s.text}>{name}</span>
        </div>
    )
}