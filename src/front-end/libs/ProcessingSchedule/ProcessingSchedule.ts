import {API_URL} from "@/front-end/libs/ProcessingSchedule/data";
import {DataScheduleType} from "@/front-end/libs/ProcessingSchedule/types";

export class ProcessingSchedule {
    private url: string;
    public schedule: DataScheduleType | null;

    constructor() {
        this.url = API_URL;
        this.schedule = null
    }

    public async getSchedule(): Promise<DataScheduleType | null> {
        try {
            const response = await fetch(this.url);
            const data = await response.json();
            this.schedule = data as DataScheduleType;
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public getRegionsFull(){
        return this.schedule?.regions.map((reg)=>{
            return {
                ...reg,
                schedule:null
            }
        })
    }

    public getRegionsOptions(){
        return this.schedule?.regions.map((reg)=>{
            return {
                value:reg.cpu,
                label:reg.name_ua,
            }
        })
    }


}