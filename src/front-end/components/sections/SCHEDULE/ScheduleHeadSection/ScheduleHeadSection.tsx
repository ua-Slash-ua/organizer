import s from './ScheduleHeadSection.module.css'
import InputSelect from "@/front-end/components/ui/select/InputSelect/InputSelect";
import {InputSelectOptionsProps} from "@/front-end/types/props/InputSelect.props";
import {formatedDate} from "@/front-end/utils/formatedDate";


export default function ScheduleHeadSection(
    {
        options,
        filter,
        targetDate,
        changeTargetDate,
        changeFilter
    }:{
        options: InputSelectOptionsProps[],
        filter: string,
        targetDate: string,
        changeFilter: (filter: string) => void
        changeTargetDate: (date: string) => void
    }
) {
    const dateList = [
        formatedDate(Date.now(), 'YYYY-MM-DD'),
        formatedDate(Date.now() + 24 * 60 * 60 * 1000, 'YYYY-MM-DD')
    ]
    return (
        <>
            <div className={s.head}>
                <InputSelect
                    label={'Виберіть область'}
                    name={'region'}
                    options={options}
                    defaultValue={filter}
                    handleOnChangeAction={changeFilter}
                    className={s.select_region}
                />
                <InputSelect
                    label={'Виберіть дату'}
                    name={'date'}
                    options={dateList}
                    defaultValue={targetDate}
                    handleOnChangeAction={changeTargetDate}
                    className={s.select_region}
                />
            </div>

        </>
    )
}