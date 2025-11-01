export type IconComponentProps = {
    src: string
    alt?: string
    className?: string
} & (
    | { element?: 'div' }
    | { element?: 'a'; href: string }

    )