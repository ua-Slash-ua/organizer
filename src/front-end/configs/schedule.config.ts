import {DataScheduleType} from "@/front-end/libs/ProcessingSchedule/types";

export type ScheduleConfigType = {
    "saved": {
        "region": string
    },
    data:DataScheduleType | null
}
