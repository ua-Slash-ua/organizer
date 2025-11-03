import {InputSelectOptionsBaseType, InputSelectOptionsProps} from "@/front-end/types/props/InputSelect.props"

export function processingOptions(
    options: InputSelectOptionsProps[]
): InputSelectOptionsBaseType[] {
    const first = options[0]

    if (typeof first === 'number') {
        return (options as number[]).map(option => ({
            value: String(option),
            label: String(option),
        }))
    }else if (typeof first === 'object' && first !== null) {
        return (options as { value: string; label: string }[])
    }else{
        return (options as string[]).map(option => ({
            value: option,
            label: option,
        }))
    }

}
