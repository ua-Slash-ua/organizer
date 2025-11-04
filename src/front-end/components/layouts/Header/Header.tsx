import Logo from "@/front-end/components/icons/Logo/Logo";
import Link from "next/link";
import s from './Header.module.css'
import {getMenuItems} from "@/front-end/utils/menuUtills";
import IconComponent from "@/front-end/components/icons/IconComponent/IconComponent";

export default function Header() {
    const settings = getMenuItems('settings')[0]
    return (
        <>
            <header className={s.header}>
                <div className={s.container}>
                    <Logo/>
                    <nav className={s.nav}>
                        {
                            getMenuItems('primary').map((item, index) => (
                                <Link
                                    className={s.menu_item}
                                    href={item.href}
                                    key={index}
                                >
                                    {item.label}
                                </Link>
                            ))
                        }
                    </nav>
                    <IconComponent {...settings.icon} {...settings} className={s.settings} element={'a'}/>

                </div>

            </header>
        </>
    )
}