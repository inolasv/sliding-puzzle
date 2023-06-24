import React from 'react'

import { useCanvas } from '@/hooks/useCanvas'
import { useGameState } from '@/hooks/useGameState'
import { useKeyDownListener } from '@/hooks/useKeyDownListener'
import { useSwipeListener } from '@/hooks/useSwipeListener'
import { drawBackground, drawBlocks } from '@/utils/canvas'

import { Direction, Touch } from '../utils/types'

export interface CanvasProps {
    height: number
    width: number
}

export const Canvas = React.memo<CanvasProps>(function Canvas({ height, width }) {
    const { blocks, selectedBlockIdx, updateSelectedBlock, moveBlock } =
        useGameState()

    const [touchStart, setTouchStart] = React.useState<Touch>({ x: 0, y: 0 })

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

    const onTouchDown = React.useCallback(
        (event: TouchEvent) => {
            const rect = canvasRef?.current?.getBoundingClientRect()

            if (rect != null) {
                const touchObj = event.changedTouches[0]

                const contentX = touchObj.clientX - rect.left
                const contentY = touchObj.clientY - rect.top
                updateSelectedBlock(
                    Math.floor((contentX / width) * 4),
                    Math.floor((contentY / height) * 5)
                )
                setTouchStart({ x: contentX, y: contentY })
            }
        },
        [canvasRef, height, updateSelectedBlock, width]
    )

    const onTouchUp = React.useCallback(
        (event: TouchEvent) => {
            const rect = canvasRef?.current?.getBoundingClientRect()

            if (rect != null) {
                const touchObj = event.changedTouches[0]

                const contentX = touchObj.clientX - rect.left
                const contentY = touchObj.clientY - rect.top

                const xDifference = contentX - touchStart.x;
                const yDifference = contentY - touchStart.y;

                if (xDifference === 0 && yDifference === 0) {
                    return;
                }

                if (yDifference < 0) {
                    if (contentX < touchStart.x + yDifference) {
                        moveBlock(Direction.LEFT)
                    } else if (contentX > touchStart.x - yDifference) {
                        moveBlock(Direction.RIGHT)
                    } else {
                        moveBlock(Direction.UP)
                    }
                } else {
                    if (contentX < touchStart.x - yDifference) {
                        moveBlock(Direction.LEFT)
                    } else if (contentX > touchStart.x + yDifference) {
                        moveBlock(Direction.RIGHT)
                    } else {
                        moveBlock(Direction.DOWN)
                    }
                }
            }
        },
        [canvasRef, moveBlock, touchStart.x, touchStart.y]
    )

    useKeyDownListener(onKeyDown)

    useSwipeListener(onTouchDown, onTouchUp)

    return (
        <canvas
            ref={canvasRef}
            onClick={onCanvasClick}
            height={height}
            width={width}
            className={`animate-fade h-[${height.toString()}px] w-[${width.toString()}px] border-8 border-solid border-[#C89F9C]`}
        />
    )
})
