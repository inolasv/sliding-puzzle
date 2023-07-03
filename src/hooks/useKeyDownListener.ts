import React from "react";

export function useKeyDownListener(eventListener: (event: KeyboardEvent) => void, element = window){
  React.useEffect(
    () => {
      // Make sure element supports addEventListener
      // On 
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Add event listener
      element.addEventListener("keydown", eventListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener("keydown", eventListener);
      };
    },
    [element, eventListener] // Re-run if eventName or element changes
  );
}