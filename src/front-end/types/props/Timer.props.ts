import {TimerForm} from "@/front-end/types/forms.type";
import {TimerConfigType} from "@/front-end/configs/timer.config";

export type TimerProps = {
    timer:TimerForm
    pause:boolean
    handlePause:(value:boolean) => void
    handler: (timer:TimerForm, upd?: boolean) => void;

}



