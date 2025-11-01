import s from './Logo.module.css'
import IconComponent from "@/front-end/components/icons/IconComponent/IconComponent";
import {iconsData} from "@/front-end/data/icons";

export default function Logo(){
    return (
        <>
            <IconComponent {...iconsData.icons.slash} element={'a'} href={'/'} className={s.logo} />

        </>
    )
}