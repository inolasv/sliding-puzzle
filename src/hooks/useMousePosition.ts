import React from "react";


export const useMousePosition = () => {

    const [localMousePos, setLocalMousePos] = React.useState({});

    const handleMouseClick = (event: MouseEvent) => {
        // Get mouse position relative to element
        const localX = event.clientX - event?.target?.offsetLeft;
        const localY = event.clientY - event?.target?.offsetTop;

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