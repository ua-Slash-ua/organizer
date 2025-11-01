export type IconType = {
    src: string;
    alt: string;
}

export type IconDataType = {
    [key: string]: { [key: string]: IconType };
};
