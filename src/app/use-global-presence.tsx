import { useEffect } from "react";

export default function createGlobalPresence(
  name: string,
  {
    onMount,
    onUnmount,
  }: {
    onMount: () => void;
    onUnmount: () => void;
  },
) {
  let count = 0;

  function add() {
    if (count === 0) {
      onMount();
    }
    count++;
  }

  function remove() {
    count--;
    if (count === 0) {
      onUnmount();
    }
  }

  return function useGlobalPresence() {
    useEffect(() => {
      add();

      return remove;
    }, []);
  };
}
