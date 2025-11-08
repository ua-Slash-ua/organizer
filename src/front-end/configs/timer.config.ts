import {TimerForm} from "@/front-end/types/forms.type";

export type TimerConfigType = {
    "started_timer": {
        "start": 'start' | 'break' | 'pause',
        "start_config": TimerForm,
        "endedAt": string
        "pauseAt": string
        "startedAt": string
    }
}

export const TimerConfigSchema = {
    started_timer: {
        start: 'string',
        endedAt: 'string',
        start_config: {
            hours: 'number',
            minutes: 'number',
            seconds: 'number',
        },
    },
} as const;