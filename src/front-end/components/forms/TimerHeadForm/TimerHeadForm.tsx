'use client'
import s from './TimerHeadForm.module.css'
import InputSelect from "@/front-end/components/ui/select/InputSelect/InputSelect";
import {FieldErrors, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {TimerProps} from "@/front-end/types/props/Timer.props";
import {TimerForm} from "@/front-end/types/forms.type";
import {log} from "@/front-end/libs/Logger";
import {saveTimer} from "@/front-end/api/timer.client";
import {TimerConfigSchema, TimerConfigType} from "@/front-end/configs/timer.config";
import {actionFormatedTime, getDateDifference} from "@/front-end/utils/formatedDate";
import {useEffect, useState} from "react";
import {validateSchema} from "@/front-end/utils/validateSchema";


export default function TimerHeadForm({timer, setTimerAction, config, setConfigAction}: TimerProps) {
    const [pause, setPause] = useState<boolean>(false)
    const {handleSubmit, register, setValue} = useForm<TimerForm>();

    const hoursOptions = Array.from({length: 25}, (_, i) => i);
    const minutesOptions = Array.from({length: 60}, (_, i) => i);
    const secondsOptions = Array.from({length: 60}, (_, i) => i);

    function handlePause() {
        let endedAt;

        if (pause) {
            // Resume — обчислюємо нове endedAt
            const diff = getDateDifference(
                new Date(config?.started_timer.endedAt!),
                new Date(config?.started_timer.pauseAt!),
                true
            ) as TimerForm;

            endedAt = actionFormatedTime(new Date(), diff, '+'); // додаємо залишок
        } else {
            // Pause — просто фіксуємо час паузи
            endedAt = config?.started_timer.endedAt;
        }

        const newConfig = {
            ...config,
            started_timer: {
                ...config?.started_timer,
                start: pause ? 'start' : 'pause',
                pauseAt: !pause ? new Date().toISOString() : '',
                endedAt
            }
        } as TimerConfigType;

        console.log('endedAt =', endedAt);
        console.log('newConfig =', newConfig);

        setConfigAction(newConfig);

        saveTimer(newConfig)
            .then(() => {
                setPause(!pause);
                console.log('Оновлено після паузи');
                log('Оновлено після паузи');
            })
            .catch(() => {
                console.log('Помилка оновлення після паузи');
                log('Помилка оновлення після паузи');
            });
    }

    function handleStop(timerValue: TimerForm = timer) {
        const newConfig = {
            ...config,
            started_timer: {
                ...config?.started_timer,
                start: 'break',
                start_config: timerValue,
            }
        } as TimerConfigType;
        saveTimer(newConfig).then(r => {
            log('timer ЗУПИНЕНО')
            setConfigAction(newConfig)
            setTimerAction(timerValue)
        }).catch(() => {
            log('timer not saved')
        })
    }

    useEffect(() => {
        if (!validateSchema<TimerConfigType>(config, TimerConfigSchema) || !config) {
            log('Тип конфігу НЕ ВІДПОВІДНИЙ');
            return;
        }
        setPause(config?.started_timer.start === 'pause')

    }, [config, setConfigAction]);
    const onSubmit: SubmitHandler<TimerForm> = (data: TimerForm) => {
        console.log('data = ', data)
        if (data.hours === 0 && data.minutes === 0 && data.seconds === 0) {
            return
        }
        const fullData = {
            started_timer: {
                start: "start",
                start_config: {
                    hours: timer.hours,
                    minutes: timer.minutes,
                    seconds: timer.seconds,
                },
                startedAt: new Date().toISOString(),
                pauseAt: '',
                endedAt: actionFormatedTime(new Date(), {...timer, seconds: timer.seconds + 1}).toISOString()
            }
        } as TimerConfigType
        saveTimer(fullData).then(r => {
            log('timer saved')
            setConfigAction(fullData)
        }).catch(() => {
            log('timer not saved')
        })
    };

    const onError: SubmitErrorHandler<TimerForm> = (errors: FieldErrors<TimerForm>) => {
        log(`Помилка запуску таймера ${JSON.stringify(errors)}`)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className={s.form}>
            <div className={s.container_choose}>
                <InputSelect
                    name="hours"
                    label="Години"
                    options={hoursOptions}
                    inputType="number"
                    defaultValue={timer.hours}
                    registerAction={register}
                    setValueAction={setValue}
                    handleOnChangeAction={(e) => {
                        setTimerAction({
                            hours: Number(e),
                            minutes: timer.minutes,
                            seconds: timer.seconds,
                        })
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
                        setTimerAction({
                            hours: timer.hours,
                            minutes: Number(e),
                            seconds: timer.seconds,
                        })
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
                        setTimerAction({
                            hours: timer.hours,
                            minutes: timer.minutes,
                            seconds: Number(e),
                        })
                    }}
                />
            </div>
            <div className={s.container_action}>
                <button
                    type="submit"
                    className={s.btn_start}

                    disabled={
                        (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) ||
                        pause ||
                        config?.started_timer.start === 'start' ||
                        config?.started_timer.start === 'pause'
                    }
                >
                    Запустити
                </button>
                <button
                    type="button"
                    onClick={handlePause}
                    disabled={(config?.started_timer.start === 'break')}
                    className={s.btn_pause}
                >
                    {pause ? 'Продовжити' : 'Пауза'}
                </button>
                <button
                    type="button"
                    onClick={()=>{
                        handleStop()
                    }}
                    disabled={config?.started_timer.start === 'break'}
                    className={s.btn_end}
                >
                    Зупинити
                </button>
                <button
                    type="button"
                    className={s.btn_drop}
                    onClick={()=>{
                        handleStop({
                            hours: 0,
                            minutes: 0,
                            seconds: 0,
                        })
                    }}
                >
                    Скинути
                </button>
            </div>

        </form>
    )
}