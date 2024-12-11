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

function subscribe(callback: () => void) {
  function handleMouseMove(event: MouseEvent) {
    x = event.clientX;
    y = event.clientY;
    callback();
  }
  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}
