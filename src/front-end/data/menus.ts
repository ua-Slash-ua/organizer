import {MenuDataType} from "@/front-end/types/menu.type";
import {iconsData} from "@/front-end/data/icons";

class Menu {
    private main = '/'
    private timer = '/timer'
    private notes = '/notes'
    private settings = '/settings'


    public getMenu(): MenuDataType {
        return [
            {
                href: this.main,
                label: 'Main',
                type: ['primary'],
                icon: iconsData.icons.slash
            },
            {
                href: this.timer,
                label: 'Timer',
                type: ['primary'],
                icon: iconsData.icons.timer
            },
            {
                href: this.notes,
                label: 'Notes',
                type: ['primary'],
                icon: iconsData.icons.notes
            },
            {
                href: this.settings,
                label: 'Settings',
                type: ['settings'],
                icon: iconsData.icons.settings
            }

        ]
    }

}

export const menuData = new Menu().getMenu()