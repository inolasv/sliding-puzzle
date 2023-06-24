import React from 'react'

import { useCanvas } from '@/hooks/useCanvas'
import { useKeyDownListener } from '@/hooks/useEventListener'
import { useGameState } from '@/hooks/useGameState'
import { drawBackground, drawBlocks } from '@/utils/canvas'
import { Direction } from '../utils/types'

export interface CanvasProps {
    height: number
    width: number
}

const Canvas = React.memo<CanvasProps>(function Canvas({ height, width }) {
    const { blocks, selectedBlockIdx, updateSelectedBlock, moveBlock } =
        useGameState()

    const draw = React.useCallback(
        (ctx: CanvasRenderingContext2D) => {
            drawBackground(ctx, height, width)
            drawBlocks(ctx, blocks, selectedBlockIdx, height / 5)
        },
        [blocks, height, selectedBlockIdx, width]
    )

    const canvasRef = useCanvas({ draw })

    const onCanvasClick = React.useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            const rect = canvasRef?.current?.getBoundingClientRect()

            if (rect != null) {
                const contentX = event.clientX - rect.left
                const contentY = event.clientY - rect.top
                updateSelectedBlock(
                    Math.floor((contentX / width) * 4),
                    Math.floor((contentY / height) * 5)
                )
            }
        },
        [canvasRef, height, updateSelectedBlock, width]
    )

    const onKeyClick = React.useCallback(
        (e: React.KeyboardEvent<HTMLCanvasElement>): void => {
            alert(e.key)
        },
        []
    )

    const onKeyDown = React.useCallback(
        (event: KeyboardEvent) => {
            switch (event.key) {
                case 'w':
                    moveBlock(Direction.UP)
                    break
                case 'a':
                    moveBlock(Direction.LEFT)
                    break
                case 's':
                    moveBlock(Direction.DOWN)
                    break
                case 'd':
                    moveBlock(Direction.RIGHT)
                    break
                default:
                // Do nothing
            }
        },
        [moveBlock]
    )

    useKeyDownListener(onKeyDown)

    return (
        <canvas
            ref={canvasRef}
            onClick={onCanvasClick}
            onKeyDown={onKeyClick}
            height={height}
            width={width}
            className={`animate-fade h-[${height.toString()}px] w-[${width.toString()}px] border-8 border-solid border-[#C89F9C]`}
        />
    )
})

export default Canvas
