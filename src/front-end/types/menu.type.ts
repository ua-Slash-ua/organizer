import {IconType} from "@/front-end/types/icons.type";

export type MenuType = {
    href: string;
    label: string;
    type:MenuTypesType[],
    icon: IconType;
}
export type MenuTypesType = 'primary' | 'secondary'| 'settings';

export type MenuDataType = MenuType[];
