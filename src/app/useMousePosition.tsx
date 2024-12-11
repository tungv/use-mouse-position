import { useSyncExternalStore } from "react";

let x = 0;
let y = 0;

export default function useMousePosition() {
  return {
    x: useX(),
    y: useY(),
  };
}

function useX() {
  return useSyncExternalStore(subscribe, () => x);
}

function useY() {
  return useSyncExternalStore(subscribe, () => y);
}

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  function handleMouseMove(event: MouseEvent) {
    x = event.clientX;
    y = event.clientY;
    requestAnimationFrame(() => {
      for (const listener of listeners) {
        listener();
      }
    });
  }

  if (listeners.size === 0) {
    window.addEventListener("mousemove", handleMouseMove);
  }

  listeners.add(callback);

  return () => {
    listeners.delete(callback);
    if (listeners.size === 0) {
      window.removeEventListener("mousemove", handleMouseMove);
    }
  };
}
