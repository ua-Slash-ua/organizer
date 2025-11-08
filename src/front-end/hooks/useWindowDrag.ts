import { useEffect, RefObject } from "react";

export function useDraggableContainer(container: RefObject<HTMLElement | null>) {
    useEffect(() => {
        const el = container.current;
        if (!el) return;

        // ставимо drag на сам контейнер
        el.style.webkitAppRegion = "drag";

        // вибираємо всі дочірні елементи
        const setNoDrag = () => {
            const children = el.querySelectorAll<HTMLElement>("*");
            children.forEach((child) => {
                child.style.webkitAppRegion = "no-drag";
            });
        };

        setNoDrag();

        // Якщо контент динамічно змінюється
        const observer = new MutationObserver(() => setNoDrag());
        observer.observe(el, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [container]);
}
