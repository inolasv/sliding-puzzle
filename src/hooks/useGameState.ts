import React from 'react'

import { Block, BlockType } from '@/utils/types'
import { Direction } from '../utils/types'

const BIG_BLOCK_IDX = 9;

export function useGameState() {
    const [blocks, setBlocks] = React.useState<Array<Block>>([
        {
            type: BlockType.DOUBLE_VERTICAL,
            left: 0,
            right: 1,
            bottom: 0,
            top: 2,
        },
        {
            type: BlockType.DOUBLE_VERTICAL,
            left: 3,
            right: 4,
            bottom: 0,
            top: 2,
        },
        {
            type: BlockType.DOUBLE_VERTICAL,
            left: 0,
            right: 1,
            bottom: 3,
            top: 5,
        },
        {
            type: BlockType.DOUBLE_VERTICAL,
            left: 3,
            right: 4,
            bottom: 3,
            top: 5,
        },
        {
            type: BlockType.DOUBLE_HORIZONTAL,
            left: 1,
            right: 3,
            bottom: 2,
            top: 3,
        },
        { type: BlockType.SINGLE, left: 1, right: 2, bottom: 3, top: 4 },
        { type: BlockType.SINGLE, left: 2, right: 3, bottom: 3, top: 4 },
        { type: BlockType.SINGLE, left: 1, right: 2, bottom: 4, top: 5 },
        { type: BlockType.SINGLE, left: 2, right: 3, bottom: 4, top: 5 },
        { type: BlockType.BIG, left: 1, right: 3, bottom: 0, top: 2 },
    ])

    const [selectedBlockIdx, setSelectedBlockIdx] = React.useState<
        number | null
    >(0);

    const updateSelectedBlock = React.useCallback(
        (row: number, column: number) => {
            for (let blockIdx = 0; blockIdx < blocks.length; blockIdx++) {
                if (
                    blocks[blockIdx].left <= row &&
                    row < blocks[blockIdx].right &&
                    blocks[blockIdx].bottom <= column &&
                    column < blocks[blockIdx].top
                ) {
                    setSelectedBlockIdx(blockIdx)
                    break
                }
            }
        },
        [blocks]
    )

    const moveBlock = React.useCallback((direction: Direction) => {
        if (selectedBlockIdx != null) {
            const blockCopy = [...blocks];
            const selectedBlock = blockCopy[selectedBlockIdx];

            switch (direction) {
                case Direction.UP:
                    if (areBlocksInSpace(blockCopy, selectedBlock.left, selectedBlock.bottom-1)) {
                        return;
                    } else if (selectedBlock.type === BlockType.BIG || selectedBlock.type === BlockType.DOUBLE_HORIZONTAL
                        && areBlocksInSpace(blockCopy, selectedBlock.left + 1, selectedBlock.bottom-1)) {
                        return;
                    }

                    selectedBlock.top -= 1;
                    selectedBlock.bottom -= 1;
                    break;
                case Direction.DOWN:
                    if (areBlocksInSpace(blockCopy, selectedBlock.left, selectedBlock.top)) {
                        return;
                    } else if ((selectedBlock.type === BlockType.BIG || selectedBlock.type === BlockType.DOUBLE_HORIZONTAL)
                        && areBlocksInSpace(blockCopy, selectedBlock.left + 1, selectedBlock.top)) {
                        return;
                    }

                    selectedBlock.top += 1;
                    selectedBlock.bottom += 1;
                    break;
                case Direction.LEFT:
                    if (areBlocksInSpace(blockCopy, selectedBlock.left-1, selectedBlock.bottom)) {
                        return;
                    } else if ((selectedBlock.type === BlockType.BIG || selectedBlock.type === BlockType.DOUBLE_VERTICAL)
                        && areBlocksInSpace(blockCopy, selectedBlock.left-1, selectedBlock.bottom + 1)) {
                        return;
                    }

                    selectedBlock.left -= 1;
                    selectedBlock.right -= 1;
                    break;
                case Direction.RIGHT:
                    if (areBlocksInSpace(blockCopy, selectedBlock.right, selectedBlock.bottom)) {
                        return;
                    } else if (selectedBlock.type === BlockType.BIG || selectedBlock.type === BlockType.DOUBLE_VERTICAL
                        && areBlocksInSpace(blockCopy, selectedBlock.right, selectedBlock.bottom + 1)) {
                        return;
                    }

                    selectedBlock.left += 1;
                    selectedBlock.right += 1;
                    break;
                default:
                    throw new Error('Did you add a new direction?')
            }
            setBlocks(blockCopy);
        }

        if (blocks[BIG_BLOCK_IDX]?.top === 5 && blocks[BIG_BLOCK_IDX]?.left === 1) {
            alert("Congrats, you won!");
        }

    }, [blocks, selectedBlockIdx]);
    return { selectedBlockIdx, blocks, updateSelectedBlock, moveBlock }
}

function areBlocksInSpace(blocks: ReadonlyArray<Block>, row: number, column: number) {
    for (let blockIdx = 0; blockIdx < blocks.length; blockIdx++) {
        if (isBlockInSpace(blocks, blockIdx, row, column)) {
            return true;
        }
    }
    return false;
}

function isBlockInSpace(blocks: ReadonlyArray<Block>, blockIdx: number, row: number, column: number) {
    return blocks[blockIdx].left <= row &&
    row < blocks[blockIdx].right &&
    blocks[blockIdx].bottom <= column &&
    column < blocks[blockIdx].top || !(0 <= row && row < 4 && 0 <= column && column < 5);
}

/*

TODO:

5. Swipe
6. Improve UI
7. Add rules

Add timer?
Add instructions
Restart game button
Ability to play back moves
Ability to show winning moves

*/
