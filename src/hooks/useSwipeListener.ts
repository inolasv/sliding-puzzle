import React from "react";

export function useSwipeListener(touchDownListener: (event: TouchEvent) => void, touchUpListener: (event: TouchEvent) => void, element = window){
  React.useEffect(
    () => {
      // Make sure element supports addEventListener
      // On 
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Add event listener
      element.addEventListener("touchstart", touchDownListener);
      element.addEventListener("touchend", touchUpListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener("touchstart", touchDownListener);
        element.removeEventListener("touchend", touchUpListener);
      };
    },
    [element, touchDownListener, touchUpListener] // Re-run if eventName or element changes
  );
}