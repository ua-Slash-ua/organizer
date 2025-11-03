'use client'
import s from './TimerHeadForm.module.css'
import InputSelect from "@/front-end/components/ui/select/InputSelect/InputSelect";
import {FieldErrors, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {TimerProps} from "@/front-end/types/props/Timer.props";
import {TimerForm} from "@/front-end/types/forms.type";
import {useEffect, useState} from "react";
import {fetchTimerConfig, saveTimer} from "@/front-end/api/timer.client";
import {TimerConfigType} from "@/front-end/configs/timer.config";
import {log} from "@/front-end/libs/Logger";
import {getEndTime} from "@/front-end/components/sections/TIMER/functions";


export default function TimerHeadForm({timer, handler, handlePause, pause}: TimerProps) {
    const [config, setConfig] = useState<TimerConfigType | undefined>()
    const [loading, setLoading] = useState(false)
    const hoursOptions = Array.from({length: 25}, (_, i) => i);
    const minutesOptions = Array.from({length: 61}, (_, i) => i);
    const secondsOptions = Array.from({length: 61}, (_, i) => i);
    const {handleSubmit, register, setValue} = useForm<TimerForm>();

    // Завантаження конфігу < timer.config >
    useEffect(() => {
        fetchTimerConfig().then(
            (data) => {
                setConfig(data)
                handler(data?.started_timer.start_config)
                // Встановлюємо loading тільки якщо таймер активний (не на паузі)
                if (data?.started_timer.start === 'start') {
                    setLoading(true)
                    handlePause(false) // Таймер активний, пауза вимкнена
                } else if (data?.started_timer.start === 'pause') {
                    setLoading(true) // Пауза теж вважається активним станом
                    handlePause(true) // Встановлюємо стан паузи
                }
            }
        ).catch(() => {
            log(`Помилка завантаження конфігу < timer.config > `)
        })
    }, []);

    function handlePauseAction() {
        if (!config) return
        handlePause(!pause)
    }

    function handleStopAction() {
        if (!config) return

        const updated: TimerConfigType = {
            started_timer: {
                ...config.started_timer,
                start: 'break',
                pauseAt: '',
                endedAt: ''
            }
        }

        saveTimer(updated).then(() => {
            setConfig(updated)
            setLoading(false)
            log('[STOP] Таймер зупинено', 'timer.log')
            // Скидаємо до початкових значень
            handler(config.started_timer.start_config)
        })
    }

    const onSubmit: SubmitHandler<TimerForm> = (data: TimerForm) => {
        const hours = Number(data.hours);
        const minutes = Number(data.minutes);
        const seconds = Number(data.seconds);

        if (hours === 0 && minutes === 0 && seconds === 0) {
            console.error('Помилка: хоча б одне значення має бути більше за 0');
            return;
        }

        handler?.(data)
        setLoading(true)

        const newConfig: TimerConfigType = {
            started_timer: {
                start: 'start',
                start_config: data, // Використовуємо data з форми, а не timer
                endedAt: getEndTime(data).toISOString(),
                pauseAt: '',
                started: new Date().toISOString()
            }
        }

        saveTimer(newConfig).then(() => {
            setConfig(newConfig)
            log(`[Запуск] Таймер на ${data.hours}:${data.minutes}:${data.seconds} запущено`, 'timer.log')
        })
    };

    const onError: SubmitErrorHandler<TimerForm> = (errors: FieldErrors<TimerForm>) => {
        log(`Помилка запуску таймера ${JSON.stringify(errors)}`)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className={s.form}>
            <InputSelect
                name="hours"
                label="Години"
                options={hoursOptions}
                inputType="number"
                defaultValue={timer.hours}
                registerAction={register}
                setValueAction={setValue}
                handleOnChangeAction={(e) => {
                    handler({
                        hours: Number(e),
                        minutes: timer.minutes,
                        seconds: timer.seconds
                    }, false)
                }}
            />
            <InputSelect
                name="minutes"
                label="Хвилини"
                options={minutesOptions}
                inputType="number"
                defaultValue={timer.minutes}
                registerAction={register}
                setValueAction={setValue}
                handleOnChangeAction={(e) => {
                    handler({
                        hours: timer.hours,
                        minutes: Number(e),
                        seconds: timer.seconds
                    }, false)
                }}
            />
            <InputSelect
                name="seconds"
                label="Секунди"
                options={secondsOptions}
                inputType="number"
                defaultValue={timer.seconds}
                registerAction={register}
                setValueAction={setValue}
                handleOnChangeAction={(e) => {
                    handler({
                        hours: timer.hours,
                        minutes: timer.minutes,
                        seconds: Number(e)
                    }, false)
                }}
            />
            <button
                type="submit"
                disabled={loading}
                className={s.btn_start}
            >
                Запустити
            </button>
            <button
                type="button"
                disabled={!loading}
                className={s.btn_pause}
                onClick={handlePauseAction}
            >
                {pause ? 'Продовжити' : 'Пауза'}
            </button>
            <button
                type="button"
                disabled={!loading}
                className={s.btn_end}
                onClick={handleStopAction}
            >
                Зупинити
            </button>
            <button
                type="button"
                disabled={loading}
                className={s.btn_drop}
                onClick={() => {
                    handler({
                        hours: 0,
                        minutes: 0,
                        seconds: 0
                    })
                }}
            >
                Скинути
            </button>
        </form>
    )
}