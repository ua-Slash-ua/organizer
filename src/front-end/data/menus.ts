import {MenuDataType} from "@/front-end/types/menu.type";
import {iconsData} from "@/front-end/data/icons";
import {MenuItem} from "@/front-end/components/ui/MenuDropdown/MenuDropdown";
import {handleClose} from "@/front-end/utils/functions/actionFunctions";

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


export const actionMenuData: MenuItem[] = [
    {
        label: 'Файл',
        children: [
            {
                label: 'Новий',
                action: () => console.log('new file')
            },
            {
                label: 'Відкрити...',
                action: () => console.log('open')
            },
            {
                label: 'Експорт',
                children: [
                    {
                        label: 'PDF',
                        action: () => console.log('export pdf')
                    },
                    {
                        label: 'DOCX',
                        action: () => console.log('export docx')
                    },
                ],
            },
            {
                label: 'Вихід',
                action: () => handleClose()
            },
        ],
    },
    {
        label: 'Розробнику',
        children: [
            {
                label: `DevTools`,
                action: async () => {
                    if (await window.electronAPI?.isDevToolsOpen()) {
                        window.electronAPI?.closeDevTools()
                    }else {
                        window.electronAPI?.openDevTools()
                    }
                }
            }
        ],
    },
];