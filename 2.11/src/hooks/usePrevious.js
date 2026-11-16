import { useEffect, useRef } from 'react';

export function usePrevious(value) {
  const previous = useRef(undefined);
  useEffect(() => {
    previous.current = value;
  }, [value]);
  return previous.current;
}
