import {IconDataType} from "@/front-end/types/icons.type";

import notes from '@p/icons/notes.svg'
import slash from '@p/icons/slash.svg'
import timer from '@p/icons/timer.svg'
import settings from '@p/icons/settings.svg'
import chevronDown   from '@p/icons/chevron-down-minor.svg'
import close   from '@p/icons/close.svg'

import resizeIn   from '@p/icons/resize-in.svg'
import resizeOut  from '@p/icons/resize-out.svg'



export const iconsData: IconDataType = {
    icons: {
        notes: {
            src: notes,
            alt: 'Notes'
        },
        slash: {
            src: slash,
            alt: 'Slash'
        },
        timer: {
            src: timer,
            alt: 'Timer'
        },
        settings: {
            src: settings,
            alt: 'Settings'
        },
        chevronDown: {
            src: chevronDown,
            alt: 'chevron Down Minor'
        },
        close: {
            src: close,
            alt: 'Close'
        },
        resize_in: {
            src: resizeIn,
            alt: 'Resize In'
        },
        resize_out: {
            src: resizeOut,
            alt: 'Resize Out'
        },

    },
}