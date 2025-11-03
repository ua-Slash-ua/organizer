'use client'
import s from './TimerBlock.module.css'
import TimerHeadSection from "@/front-end/components/sections/TIMER/TimerHeadSection/TimerHeadSection";
import TimerPreviewSection from "@/front-end/components/sections/TIMER/TimerPreviewSection/TimerPreviewSection";
import { useState} from "react";
import {TimerForm} from "@/front-end/types/forms.type";

export default function TimerBlock() {
    const [update, setUpdate] = useState<boolean>(true)
    const [pause, setPause] = useState<boolean>(false)
    const [timer, setTimer] = useState<TimerForm>({
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    function handlePause(value: boolean) {

        setPause(value)
    }


    function handleTimer(timer: TimerForm, upd: boolean = true) {
        setTimer(timer)
        if (upd){
            setUpdate(!update)
        }
    }


    return (
        <>
            <div className={s.block}>
                <TimerHeadSection timer={timer} pause={pause} handlePause={handlePause} handler={handleTimer}/>
                <TimerPreviewSection update={update} pause={pause} timerFull={timer}/>
            </div>

        </>
    )
}