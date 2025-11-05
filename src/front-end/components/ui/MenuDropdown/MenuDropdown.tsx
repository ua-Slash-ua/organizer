'use client'
import { useState } from 'react'
import s from './MenuDropdown.module.css'
import clsx from 'clsx'


export type MenuItem = {
    label: string;
    action?: () => void;
    children?: MenuItem[];
};


export default function MenuDropdown({ items, className }: { items: MenuItem[], className?: string; }) {
    return (
        <div className={clsx(s.menu_bar,className)}>
            {items.map((item, i) => (
                <MenuItemComponent key={i} item={item}/>
            ))}
        </div>
    )
}

function MenuItemComponent({ item }: { item: MenuItem }) {
    const [open, setOpen] = useState(false)

    return (
        <div
            className={clsx(s.menu_item, open && s.active, )}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div className={s.label} onClick={item.action}>{item.label}</div>

            {item.children && open && (
                <div className={s.dropdown}>
                    {item.children.map((child, i) => (
                        <MenuItemComponent key={i} item={child}/>
                    ))}
                </div>
            )}
        </div>
    )
}




