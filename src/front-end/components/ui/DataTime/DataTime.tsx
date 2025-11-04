'use client'
import s from './DataTime.module.css'
import {useEffect, useState} from "react";
import {formatedDate} from '@/front-end/utils/formatedDate';
import IconComponent from "@/front-end/components/icons/IconComponent/IconComponent";
import {iconsData} from "@/front-end/data/icons";
import clsx from "clsx";

export function DataTime() {
    const [active, setActive] = useState<boolean>(true)
    const [date, setDate] = useState<{
        date: string,
        time: string,
    }>(() => {
        return {
            date: formatedDate(Date.now(), 'DD.MM.YY'),
            time: formatedDate(Date.now(), 'HH.mm')
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setDate({
                date: formatedDate(Date.now(), 'DD.MM.YY'),
                time: formatedDate(Date.now(), 'HH.mm')
            });
        }, 1000); // оновлення щосекунди

        return () => clearInterval(interval); // очищення інтервалу при демонтажі
    }, []);

    function changeActive(){
        setActive(!active)
        console.log('click')
    }

    return (
        <div className={clsx(s.container, active? s.active: '')}>
                <IconComponent {...iconsData.icons.chevronDown} element={'div'} className={s.icon} onChangeAction={changeActive} />
            <span className={s.time}>{date.time}</span>
            <span className={s.date}>{date.date}</span>
        </div>
    );
}
