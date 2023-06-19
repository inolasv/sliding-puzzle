export type ValuesUnion<T extends object> = T[keyof T];

export const BlockType = {
    BIG: "big",
    DOUBLE_HORIZONTAL: "double horizontal",
    DOUBLE_VERTICAL: "double vertical1",
    SINGLE: "single"
}

export type BlockType = ValuesUnion<typeof BlockType>;

export interface Block {
    readonly type: BlockType,
    readonly x: number,
    readonly y: number
}

