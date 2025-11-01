import {MenuTypesType} from "@/front-end/types/menu.type";
import {menuData} from "@/front-end/data/menus";

export function getMenuItems(type: MenuTypesType | MenuTypesType[]) {
    const types = Array.isArray(type) ? type : [type];
    return menuData.filter(item => {
        const itemTypes = Array.isArray(item.type) ? item.type : [item.type];
        return types.every(t => itemTypes.includes(t));
    });
}

