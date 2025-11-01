import s from './IconComponent.module.css';
import {IconComponentProps} from "@/front-end/types/props/IconComponent.props";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

export default function IconComponent({element, src, alt = 'Image', className, ...rest}: IconComponentProps) {
    const {href} = rest as { href: string };


    switch (element) {
        case 'a':
            return <Link href={href} className={clsx(s.container, className)}>
                <Image src={src} alt={alt} width={1000} height={1000} className={s.image}/>
            </Link>
        case 'div':
            return <div className={clsx(s.container, className)}>
                <Image src={src} alt={alt} width={1000} height={1000} className={s.image}/>
            </div>
        default:
            return <Image src={src} alt={alt} width={1000} height={1000} className={clsx(s.image, className)}/>
    }
}

