'use client'

import {useEffect, useState, useRef} from 'react'
import s from './TimerPreviewSection.module.css'
import {log} from '@/front-end/libs/Logger'
import {TimerConfigType} from '@/front-end/configs/timer.config'
import {fetchTimerConfig, saveTimer} from '@/front-end/api/timer.client'
import {startCountdown} from "@/front-end/components/sections/TIMER/functions"
import {TimerForm} from "@/front-end/types/forms.type"
import {TimerProps} from "@/front-end/types/props/Timer.props";

export default function TimerPreviewSection({timer, config}:TimerProps) {

    return (
        <section className={s.section}>
            <TimerItem time={timer.hours} typeItem="hours"/>
            <div className={s.replacer}>:</div>
            <TimerItem time={timer.minutes} typeItem="minutes"/>
            <div className={s.replacer}>:</div>
            <TimerItem time={timer.seconds} typeItem="seconds"/>
        </section>
    )
}

function TimerItem({time = 0, typeItem}: { time?: number; typeItem: string }) {
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