import s from './TimerBlock.module.css'
import TimerHeadSection from "@/front-end/components/sections/TIMER/TimerHeadSection/TimerHeadSection";

export default function TimerBlock() {


    return (
        <>
            <div className={s.block}>
                <TimerHeadSection/>
            </div>

        </>
    )
}