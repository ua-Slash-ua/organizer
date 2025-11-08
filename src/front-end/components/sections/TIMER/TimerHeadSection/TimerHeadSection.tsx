'use client'

import s from './TimerHeadSection.module.css'
import {TimerProps} from "@/front-end/types/props/Timer.props";
import TimerHeadForm from "@/front-end/components/forms/TimerHeadForm/TimerHeadForm";
import {useState} from "react";
import IconComponent from "@/front-end/components/icons/IconComponent/IconComponent";
import {iconsData} from "@/front-end/data/icons";
import clsx from "clsx";

export default function TimerHeadSection({timer, setTimerAction, config , setConfigAction}:TimerProps) {
    const [active, setActive] = useState<boolean>(true)

    return (
        <section className={s.section}>
            <div className={s.head} onClick={() => setActive(!active)}>
                <h1> Налаштування таймеру </h1> <IconComponent {...iconsData.icons.chevronDown} className={s.icon} />
            </div>
            <div className={clsx(s.content, active && s.open)}>
                <TimerHeadForm timer={timer} setTimerAction={setTimerAction} config={config} setConfigAction={setConfigAction}/>
            </div>
        </section>
    )
}