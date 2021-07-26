import { RefObject, useEffect } from "react";

type AnyEvent = MouseEvent | TouchEvent;

export function useClickOutside(
  elementRef: RefObject<any>,
  toggleRef: RefObject<any>,
  handler: (event: AnyEvent) => void
) {
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      const el = elementRef?.current;
      const toggleBtn = toggleRef?.current;

      if (
        el?.contains(event.target as Node) ||
        toggleBtn?.contains(event.target as Node)
      ) {
        return;
      }
      handler(event);
    };

    document.addEventListener(`mousedown`, listener);
    document.addEventListener(`touchstart`, listener);

    return () => {
      document.removeEventListener(`mousedown`, listener);
      document.removeEventListener(`touchstart`, listener);
    };
  }, [elementRef, toggleRef, handler]);
}
