import {TimerForm} from "@/front-end/types/forms.type";
import {TimerConfigType} from "@/front-end/configs/timer.config";

export type TimerProps = {
    timer: TimerForm,
    setTimerAction: (timer: TimerForm) => void,
    config: TimerConfigType | undefined,
    setConfigAction: (config: TimerConfigType) => void,
}



