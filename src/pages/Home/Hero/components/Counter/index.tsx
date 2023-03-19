import { animate } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

interface CounterType {
  from: number;
  to: number
}

function Counter({ from, to }: CounterType) {
  const nodeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node!.textContent = Number(value).toFixed(0);
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <p ref={nodeRef} />;
}

export default Counter;
