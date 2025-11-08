'use client'
import s from './TimerBlock.module.css'
import TimerHeadSection from "@/front-end/components/sections/TIMER/TimerHeadSection/TimerHeadSection";
import TimerPreviewSection from "@/front-end/components/sections/TIMER/TimerPreviewSection/TimerPreviewSection";
import {useEffect, useState} from "react";
import {TimerForm} from "@/front-end/types/forms.type";
import {TimerConfigSchema, TimerConfigType} from "@/front-end/configs/timer.config";
import {getDateDifference} from "@/front-end/utils/formatedDate";
import {fetchTimerConfig, saveTimer} from "@/front-end/api/timer.client";
import {log} from "@/front-end/libs/Logger";
import { validateSchema} from "@/front-end/utils/validateSchema";

export default function TimerBlock() {
    const [timer, setTimer] = useState<TimerForm>({
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const [timerDefault, setTimerDefault] = useState<TimerForm>({
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const [timerUpdated, setTimerUpdated] = useState(false);
    const [pause, setPause] = useState<boolean>(false)
    const [config, setConfig] = useState<TimerConfigType | undefined>()

    function handleTimer(timer: TimerForm) {
        setTimerDefault(timer);
        setTimerUpdated(prev => !prev); // 👈 міняємо флаг при кожному виклику
    }


    function handleConfig(config: TimerConfigType) {
        setConfig(config)
    }


    useEffect(() => {
        if (config?.started_timer.start === 'pause') {
            setTimer(getDateDifference(new Date(config.started_timer.endedAt), new Date(config.started_timer.pauseAt), true) as TimerForm);
        }else{
            setTimer(timerDefault)
        }
    }, [timerUpdated])

    useEffect(() => {
        async function loadConfig(){
            try {
                const data = await fetchTimerConfig();

                if (!validateSchema<TimerConfigType>(data, TimerConfigSchema)) {
                    log('Тип конфігу НЕ ВІДПОВІДНИЙ');
                    return;
                }


                setConfig(data);
                // Встановлюємо початковий таймер з конфігу
                handleTimer(data.started_timer.start_config);
                // setTimer(data.started_timer.start_config);

                log('Конфіг завантажено');
            } catch (error) {
                log('Помилка завантаження конфігу');
            }
        }
        loadConfig();
    }, []);

    useEffect(() => {
        if (!config ||  config.started_timer.start !== 'start' ) return;

        if (new Date().toISOString() >= config.started_timer.endedAt) return

        const firstStart  = getDateDifference(new Date(config.started_timer.endedAt), new Date(), true) as TimerForm
        setTimer(firstStart)
        const interval = setInterval(() => {
            const now = new Date();
            const end = new Date(config.started_timer.endedAt);

            if (now.getTime() >= end.getTime()) {
                clearInterval(interval);
                const newConfig = {
                    ...config,
                    started_timer: {
                        ...config?.started_timer,
                        start: 'break',
                    }
                } as TimerConfigType;
                saveTimer(newConfig).then(() => {
                    setConfig(newConfig);
                    log('Оновлено після завершення');
                }).catch(() => {
                    log('НЕ оновлено після завершення');
                })

            } else {

                const res = getDateDifference(end, now, true) as TimerForm;
                setTimer(res);
                // console.log("Таймер триває", now.toISOString());
            }

        }, 500);

        // Очищення інтервалу при розмонтуванні компонента
        return () => clearInterval(interval);
    }, [config, setConfig]);


    return (
        <>
            <div className={s.block}>
                <TimerHeadSection
                    timer={timerDefault}
                    setTimerAction={handleTimer}
                    config={config}
                    setConfigAction={handleConfig}
                />
                <TimerPreviewSection
                    timer={timer}
                    setTimerAction={handleTimer}
                    config={config}
                    setConfigAction={handleConfig}
                />
            </div>

        </>
    )
}