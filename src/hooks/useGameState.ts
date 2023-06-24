import React from "react";

import { Block, BlockType } from '@/utils/types';

export function useGameState() {
    const [blocks, setBlocks] = React.useState<Array<Block>>([{type: BlockType.DOUBLE_VERTICAL, left: 0, right: 1, bottom: 0, top: 2}, 
        {type: BlockType.DOUBLE_VERTICAL, left: 3, right: 4, bottom: 0, top: 2}, 
        {type: BlockType.DOUBLE_VERTICAL, left: 0, right: 1, bottom: 3, top: 5}, 
        {type: BlockType.DOUBLE_VERTICAL, left: 3, right: 4, bottom: 3, top: 5}, 
        {type: BlockType.DOUBLE_HORIZONTAL, left: 1, right: 3, bottom: 2, top: 3}, 
        {type: BlockType.SINGLE, left: 1, right: 2, bottom: 3, top: 4}, 
        {type: BlockType.SINGLE, left: 2, right: 3, bottom: 3, top: 4},
        {type: BlockType.SINGLE, left: 1, right: 2, bottom: 4, top: 5},
        {type: BlockType.SINGLE, left: 2, right: 3, bottom: 4, top: 5},
        {type: BlockType.BIG, left: 1, right: 3, bottom: 0, top: 2}])
    
    const [selectedBlockIdx, setSelectedBlockIdx] = React.useState<number | null>(0);

    const updateSelectedBlock = React.useCallback((row: number, column: number) => {
        for (let blockIdx = 0; blockIdx < blocks.length; blockIdx++) {
            if (blocks[blockIdx].left <= row && row < blocks[blockIdx].right && blocks[blockIdx].bottom <= column && column < blocks[blockIdx].top) {
                setSelectedBlockIdx(blockIdx);
                break;
            }
        }
    }, [blocks])
    
    return {selectedBlockIdx, blocks, updateSelectedBlock}
}

/*

TODO:

2. Apply move to block
3. Check if valid move
4. Animate move block
5. Check if won game
6. Improve UI
7. Add rules

*/