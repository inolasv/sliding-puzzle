import React from 'react';

import { useCanvas } from '@/hooks/useCanvas';
import { useGameState } from '@/hooks/useGameState';
import { drawBackground, drawBlocks } from '@/utils/canvas';

export interface CanvasProps {
    height: number;
    width: number;
}

const Canvas = React.memo<CanvasProps>(function Canvas({ height, width }) {
    const { blocks } = useGameState();


    const draw = React.useCallback(
        (ctx: CanvasRenderingContext2D) => {
            drawBackground(ctx, height, width);
            drawBlocks(ctx, blocks, height / 5);
        },
        [blocks, height, width]
    );

    const canvasRef = useCanvas({ draw });

    return <canvas ref={canvasRef} height={height} width={width} className={`h-[${height.toString()}px] w-[${width.toString()}px] border-8 border-solid border-[#C89F9C]`} />;
});

export default Canvas;
