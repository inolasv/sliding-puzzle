import React from 'react';

import { useCanvas } from '@/hooks/useCanvas';
import { useGameState } from '@/hooks/useGameState';
import { drawBackground, drawBlocks } from '@/utils/canvas';

export interface CanvasProps {
    height: number;
    width: number;
}

const Canvas = React.memo<CanvasProps>(function Canvas({ height, width }) {
    const { blocks, selectedBlockIdx, updateSelectedBlock } = useGameState();

    const draw = React.useCallback(
        (ctx: CanvasRenderingContext2D) => {
            drawBackground(ctx, height, width);
            drawBlocks(ctx, blocks, selectedBlockIdx, height / 5);
        },
        [blocks, height, selectedBlockIdx, width]
    );

    const canvasRef = useCanvas({ draw });

    const onCanvasClick = React.useCallback((event:  React.MouseEvent<HTMLElement>) => {
        const rect = canvasRef?.current?.getBoundingClientRect();

        if (rect != null) {
            const contentX = event.clientX - rect.left;
            const contentY  = event.clientY - rect.top;
            updateSelectedBlock(Math.floor(contentX / width * 4), Math.floor(contentY / height * 5));
        }
    }, [canvasRef, height, updateSelectedBlock, width])

    return <canvas ref={canvasRef} onClick = {onCanvasClick} height={height} width={width} className={`h-[${height.toString()}px] w-[${width.toString()}px] border-8 border-solid border-[#C89F9C]`} />;
});

export default Canvas;
