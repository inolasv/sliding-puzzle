import React from "react";

export const useMousePosition = () => {

    const [localMousePos, setLocalMousePos] = React.useState({});

    const handleMouseClick = (event: MouseEvent) => {
        // Get mouse position relative to element
        const { target } = event;
        const localX = event.clientX - (target as HTMLElement).offsetLeft;
        const localY = event.clientY - (target as HTMLElement).offsetTop;

        setLocalMousePos({ x: localX, y: localY });
    };

    React.useEffect(() => {
        window.addEventListener('mousemove', handleMouseClick);
    
        return () => {
          window.removeEventListener(
            'mousemove',
            handleMouseClick
          );
        };
      }, []);

      console.log(localMousePos);
      return {localMousePos}
}