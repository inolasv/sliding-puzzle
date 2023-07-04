export type ValuesUnion<T extends object> = T[keyof T];

export const BlockType = {
    BIG: "big",
    DOUBLE_HORIZONTAL: "double horizontal",
    DOUBLE_VERTICAL: "double vertical1",
    SINGLE: "single"
} as const;

export type BlockType = ValuesUnion<typeof BlockType>;

export interface Block {
    readonly type: BlockType,
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export const Direction = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right"
} as const;

export type Direction = ValuesUnion<typeof Direction>;

export interface Touch {
    x: number;
    y: number;
}

export interface Mouse {
    x: number;
    y: number;
}

