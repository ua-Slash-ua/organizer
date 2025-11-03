'use client'
import s from './InputSelect.module.css'
import {InputSelectProps} from "@/front-end/types/props/InputSelect.props";
import {useEffect, useRef, useState} from "react";
import {processingOptions} from "@/front-end/components/ui/select/InputSelect/processingOptions";
import clsx from "clsx";

export default function InputSelect<T extends Record<string, unknown> = Record<string, unknown>>({
                                                                                                     name,
                                                                                                     label,
                                                                                                     className,
                                                                                                     options,
                                                                                                     inputType = 'text',
                                                                                                     defaultValue,
                                                                                                     setValueAction,
                                                                                                     registerAction,
    registerOptions,
                                                                                                     handleOnChangeAction,
                                                                                                     error
                                                                                                 }: InputSelectProps<T>) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [active, setActive] = useState(false)
    const [value, setValue] = useState(() =>
        defaultValue
            ? processingOptions([defaultValue])[0]
            : processingOptions(options)[0]

    )

    function handleOption(option: { value: string; label: string }) {
        setValue(option)
        setActive(false)
        handleOnChangeAction?.(option.value)
        setValueAction?.(name, option.value as never)


    }
    useEffect(() => {
        if (defaultValue !== undefined)
            setValueAction?.(name, defaultValue as never)
    }, [defaultValue, name, setValueAction])


    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node))
                setActive(false)
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className={clsx(s.container, className)} ref={containerRef}>
            {label && <label htmlFor={name}>{label}</label>}

            <div className={s.input_container} onClick={() => {
                setActive(!active)
                console.log('click')
            }}>
                <input
                    type={inputType}
                    className={s.input}
                    value={value.label}
                    readOnly
                    {...(registerAction ? registerAction(name as never, registerOptions) : {})}
                />
                <span className={s.error}>{error??null}</span>
                
            </div>

            <ul className={clsx(s.options_container, active && s.active)}>
                {processingOptions(options).map((option, i) => (
                    <li
                        key={i}
                        className={s.option}
                        onClick={() => handleOption(option)}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    )
}
