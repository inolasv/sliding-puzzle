import React from 'react';

export interface useCanvasArgs {
    readonly draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
}

export const useCanvas = ({ draw }: useCanvasArgs) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    React.useEffect(() => {
        const context = canvasRef?.current?.getContext('2d');
        let animationFrameId = 0;

        if (context) {
            let frameCount = 0;

            const render = () => {
                frameCount++;
                draw(context, frameCount);
                animationFrameId = window.requestAnimationFrame(render);
            };
            render();
        }

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [draw]);

    return canvasRef;
};
