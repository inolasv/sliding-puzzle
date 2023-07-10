import React from "react";

export const useMouseMove = (mouseDownListener: (event: MouseEvent) => void, mouseUpListener: (event: MouseEvent) => void) => {
    React.useEffect(() => {
        window.addEventListener('mouseup', mouseUpListener);
        window.addEventListener('mousedown', mouseDownListener);
    
        return () => {
          window.removeEventListener(
            'mouseup',
            mouseUpListener
          );
          window.removeEventListener(
            'mousedown',
            mouseDownListener
          );
        };
      }, [mouseDownListener, mouseUpListener]);
}