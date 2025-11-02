'use client'
import s from './TimerHeadSection.module.css'
import InputSelect from "@/front-end/components/ui/select/InputSelect/InputSelect";
import {FieldErrors, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";

type TimerForm = {
    hours: number,
    minutes: number,
    seconds: number
}

export default function TimerHeadSection() {
    const hoursOptions = Array.from({length: 25}, (_, i) => i);
    const minutesOptions = Array.from({length: 61}, (_, i) => i);
    const secondsOptions = Array.from({length: 61}, (_, i) => i);
    const {handleSubmit, formState, register, setValue , watch} = useForm<TimerForm>();


    const onSubmit: SubmitHandler<TimerForm> = (data: TimerForm) => {
        console.log(data);
    }

    const onError: SubmitErrorHandler<TimerForm> = (errors: FieldErrors<TimerForm>) => {
        console.log(errors);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className={s.section}>
            <InputSelect
                name="hours"
                label="Години"
                options={hoursOptions}
                inputType="number"
                registerAction={register}
                setValueAction={setValue}
            />
            <InputSelect
                name="minutes"
                label="Хвилини"
                options={minutesOptions}
                inputType="number"
                registerAction={register}
                setValueAction={setValue}
            />
            <InputSelect
                name="seconds"
                label="Секунди"
                options={secondsOptions}
                inputType="number"
                registerAction={register}
                setValueAction={setValue}
            />
            <button>oin</button>
        </form>
    )
}
