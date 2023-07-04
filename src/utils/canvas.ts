import { Block, BlockType } from "./types";

const MARGIN_PX = 3;

export function drawBackground(ctx: CanvasRenderingContext2D, height: number, width: number) {
    ctx.fillStyle = "#F1E7E4";
    ctx.fillRect(0, 0, width, height);
}

export function drawGoalSquare(ctx: CanvasRenderingContext2D, height: number, width: number) {
    ctx.fillStyle = "#c8e1cc";
    ctx.fillRect(width/4, 3 * height/5, width/2, 3 * height / 5);

}

export function drawBlocks(ctx: CanvasRenderingContext2D, blocks: Array<Block>, selectedBlockIdx: number | null, squareSize: number) {    
    let blockIdx = 0;

    ctx.lineWidth = MARGIN_PX;

    for (const block of blocks) {
        const adjustedX = (block.left + block.right) / 2 * squareSize;
        const adjustedY = (block.bottom + block.top) / 2 * squareSize;

        switch (block.type) {
            case BlockType.SINGLE:
                ctx.fillStyle = "#5BC0EB";
                ctx.fillRect(adjustedX - squareSize/2 + MARGIN_PX, adjustedY - squareSize/2 + MARGIN_PX, squareSize - 2*MARGIN_PX, squareSize - 2*MARGIN_PX);
                
                if (blockIdx === selectedBlockIdx) {
                    ctx.strokeStyle = "#3f86a4";
                    ctx.strokeRect(adjustedX - squareSize/2 + MARGIN_PX, adjustedY - squareSize/2 + MARGIN_PX, squareSize - 2*MARGIN_PX, squareSize - 2*MARGIN_PX);
                }

                break;
            case BlockType.DOUBLE_VERTICAL:
                ctx.fillStyle = "#FABC2A";
                ctx.fillRect(adjustedX - squareSize/2 + MARGIN_PX, adjustedY - squareSize + MARGIN_PX, squareSize - 2*MARGIN_PX, squareSize*2 - 2*MARGIN_PX);
                
                if (blockIdx === selectedBlockIdx) {
                    ctx.strokeStyle = "#af831d";
                    ctx.strokeRect(adjustedX - squareSize/2 + MARGIN_PX, adjustedY - squareSize + MARGIN_PX, squareSize - 2*MARGIN_PX, squareSize*2 - 2*MARGIN_PX);
                }
                
                break;
            case BlockType.DOUBLE_HORIZONTAL:
                ctx.fillStyle = "#FABC2A";
                ctx.fillRect(adjustedX - squareSize + MARGIN_PX, adjustedY - squareSize/2 + MARGIN_PX, squareSize*2 - 2*MARGIN_PX, squareSize - 2*MARGIN_PX);
                
                if (blockIdx === selectedBlockIdx) {
                    ctx.strokeStyle = "#af831d";
                    ctx.strokeRect(adjustedX - squareSize + MARGIN_PX, adjustedY - squareSize/2 + MARGIN_PX, squareSize*2 - 2*MARGIN_PX, squareSize - 2*MARGIN_PX);
                }
                
                break;
            case BlockType.BIG:
                ctx.fillStyle = "#F05365";
                ctx.fillRect(adjustedX - squareSize + MARGIN_PX, adjustedY - squareSize + MARGIN_PX, squareSize*2 - 2*MARGIN_PX, squareSize*2 - 2*MARGIN_PX);
                
                if (blockIdx === selectedBlockIdx) {
                    ctx.strokeStyle = "#a83a46";
                    ctx.strokeRect(adjustedX - squareSize + MARGIN_PX, adjustedY - squareSize + MARGIN_PX, squareSize*2 - 2*MARGIN_PX, squareSize*2 - 2*MARGIN_PX);
                }
                
                break;
            default:
                throw new Error("Who added a new block???");
        }

        blockIdx += 1;
    }
}