import {TimerForm} from "@/front-end/types/forms.type";

export type TimerConfigType = {
    "started_timer": {
        "start": 'start' | 'break' | 'pause',
        "start_config": TimerForm,
        "endedAt": string
        "pauseAt": string
        "started": string
    }
}