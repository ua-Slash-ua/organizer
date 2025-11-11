export interface DataScheduleType {
    date_today:string,
    date_tomorrow:string,
    regions:RegionsScheduleType[]
}

export interface RegionsScheduleType{
    cpu:string,
    name_ua:string,
    name_ru:string,
    name_en:string,
    times?:string[],
    queue?:string[],
    schedule: ScheduleType | null
}

export interface ScheduleType {
    [group: string]: {
        [date: string]: {
            [time: string]: number;
        };
    };
}
