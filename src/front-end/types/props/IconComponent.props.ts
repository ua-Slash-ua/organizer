export type IconComponentProps = {
    src: string
    alt?: string
    onChangeAction?: ()=>void
    className?: string
} & (
    | { element?: 'div' }
    | { element?: 'a'; href: string }

    )