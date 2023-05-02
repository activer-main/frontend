import { useEffect, DependencyList } from 'react';

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList,
) {
  useEffect(() => {
    if (deps) {
      const t = setTimeout(() => {
        // @ts-ignore
      // eslint-disable-next-line
      fn.apply(undefined, deps);
      }, waitTime);

      return () => {
        clearTimeout(t);
      };
    }
  }, deps);
}
