import { Path, UseFormRegister, UseFormSetValue } from "react-hook-form"

export type InputSelectProps<T extends Record<string, unknown> = Record<string, unknown>> = {
    label?: string
    name: Path<T>
    className?: string
    options: InputSelectOptionsProps[]
    inputType?: 'text' | 'number'
    handleOnChangeAction?: (e: string) => void
    defaultValue?: InputSelectOptionsProps
    registerAction?: UseFormRegister<T>
    setValueAction?: UseFormSetValue<T>
}



export type InputSelectOptionsBaseType = {
    value: string;
    label: string;
};

export type InputSelectOptionsProps = {
    value: string | number;
    label: string;
} | string | number;