import React from "react";

import { Block, BlockType } from '@/utils/types';

export function useGameState() {
    const [blocks, setBlocks] = React.useState<Array<Block>>([{type: BlockType.DOUBLE_VERTICAL, x: 0.5, y: 1}, 
        {type: BlockType.DOUBLE_VERTICAL, x: 3.5, y: 1}, 
        {type: BlockType.DOUBLE_VERTICAL, x: 0.5, y: 4}, 
        {type: BlockType.DOUBLE_VERTICAL, x: 3.5, y: 4}, 
        {type: BlockType.DOUBLE_HORIZONTAL, x: 2, y: 2.5}, 
        {type: BlockType.SINGLE, x: 1.5, y: 3.5}, 
        {type: BlockType.SINGLE, x: 2.5, y: 3.5},
        {type: BlockType.SINGLE, x: 1.5, y: 4.5},
        {type: BlockType.SINGLE, x: 2.5, y: 4.5},
        {type: BlockType.BIG, x: 2, y: 1}])
    
    return {blocks}
}

/*

TODO:

1. Select blocks
2. Apply move to block
3. Check if valid move
4. Animate move block
5. Check if won game
6. Improve UI
7. Add rules

*/