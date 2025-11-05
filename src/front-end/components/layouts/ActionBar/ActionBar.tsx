'use client'
import s from './ActionBar.module.css'
import {iconsData} from "@/front-end/data/icons";
import IconComponent from "@/front-end/components/icons/IconComponent/IconComponent";
import {useEffect, useState} from "react";
import MenuDropdown from "@/front-end/components/ui/MenuDropdown/MenuDropdown";
import {actionMenuData} from "@/front-end/data/menus";
import {handleClose, handleResize} from "@/front-end/utils/functions/actionFunctions";

export default function ActionBar() {
    const [isMaximized, setIsMaximized] = useState(false);


    // Зміна розміру екрану
    useEffect(() => {
        window.electronAPI?.onMaximizeChange?.((state) => {
            setIsMaximized(state);
        });
    }, []);

    return (
        <div className={s.container}>
            <MenuDropdown items={actionMenuData}/>

            <div className={s.actions_bar}>
                <IconComponent
                    {...(isMaximized ? iconsData.icons.resize_in : iconsData.icons.resize_out)}
                    className={s.btn_resize}
                    element="div"
                    onChangeAction={handleResize}
                />

                <IconComponent
                    {...iconsData.icons.close}
                    className={s.btn_close}
                    element="div"
                    onChangeAction={handleClose}
                />
            </div>
        </div>
    );
}
