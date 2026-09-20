import { useEffect } from "react";

type Cleanup = () => void | Promise<void>;
type Callback = () => Promise<void | Cleanup>;

export const useAsyncEffect = (asyncEffect: Callback, deps?: unknown[]) => {
  useEffect(() => {
    let isMounted = true;
    let cleanup: Cleanup | undefined;

    asyncEffect().then((fn) => {
      if (fn) {
        cleanup = fn;
      }

      if (cleanup && !isMounted) {
        cleanup();
      }
    });

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, deps);
};
