'use client'
import ScheduleHeadSection from "@/front-end/components/sections/SCHEDULE/ScheduleHeadSection/ScheduleHeadSection";
import {ProcessingSchedule} from "@/front-end/libs/ProcessingSchedule/ProcessingSchedule";
import {useEffect, useState} from "react";
import {ScheduleConfigType} from "@/front-end/configs/schedule.config";
import {log} from "@/front-end/libs/Logger";
import {ProcessingConfig} from "@/front-end/libs/ProcessingConfig/ProcessingConfig";
import {isEqual} from 'lodash';
import {InputSelectOptionsProps} from "@/front-end/types/props/InputSelect.props";
import SchedulePreviewFull from "@/front-end/components/tabs/SCHEDULE/SchedulePreviewFull/SchedulePreviewFull";
import {formatedDate} from "@/front-end/utils/formatedDate";

const schedule = new ProcessingSchedule();
const configManager = new ProcessingConfig('schedule.config.json');

type scheduleTabs = 'full' | 'short'

export default function ScheduleBlock() {
    const [activeTab, setActiveTab] = useState<scheduleTabs>("full");
    const [optionsRegion, setOptionsRegion] = useState<InputSelectOptionsProps[]>([{
        label: '',
        value: ''
    }]);
    const [loading, setLoading] = useState<boolean>(true);
    const [config, setConfig] = useState<ScheduleConfigType | undefined>();
    const [filter, setFilter] = useState<string>('');
    const [targetDate, setTargetDate] = useState<string>(formatedDate(Date.now(), 'YYYY-MM-DD'));

    useEffect(() => {
        let currentConfig: ScheduleConfigType | undefined;

        configManager.getConfig().then(r => {
            if (!r) {
                log("Schedule NO config loaded");
                return;
            }
            currentConfig = r;
            setConfig(r);
            log("Schedule config loaded");
        });

        schedule.getSchedule().then(result => {
            let newData: ScheduleConfigType;
            if (!currentConfig) {
                newData = {
                    saved: {region: ''},
                    data: result
                };
            } else {
                newData = {
                    ...currentConfig,
                    data: result
                };
            }
            newData = {
                ...newData,
                saved: {
                    region: newData.saved.region !== '' ? newData.saved.region : result?.regions[0].cpu!,
                }
            }
            if (isEqual(currentConfig?.data, result)) {

                log("Already successfully");
            } else {
                configManager.saveConfig(newData).then(() => {
                    log("Schedule saved successfully");
                });
            }
            setOptionsRegion(schedule.getRegionsOptions() || [])
            setConfig(newData)
            setFilter(newData.saved.region)
            setLoading(false);
        });
    }, []);


    useEffect(() => {
        if (!config) return
        configManager.saveConfig({
            ...config,
            saved: {
                region: filter
            },
        }).then(e => {
            log("Schedule REGION saved successfully");
        }).catch(() => {
                log('Error saved Schedule REGION')
            }
        )
    }, [filter, setFilter]);


    function handleFilterChange(filter: string) {
        setFilter(filter);
    }
    function handleTargetDateChange(date: string) {
        setTargetDate(date);
    }

    if (loading) {
        return <p>Loading...</p>
    }

    function previewTab(){
        switch (activeTab) {
            case 'full':
                return <SchedulePreviewFull config={config!} filter={filter} targetDate={targetDate} />
        }
    }

    return (
        <>
            <ScheduleHeadSection options={optionsRegion} filter={filter} targetDate={targetDate} changeFilter={handleFilterChange} changeTargetDate={handleTargetDateChange}/>
            {previewTab()}
            {/*<pre>{JSON.stringify(config?.data, null, 2)}</pre>*/}


        </>
    );
}
