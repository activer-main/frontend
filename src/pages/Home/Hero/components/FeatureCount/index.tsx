import { Paper, Typography } from '@mui/material';
import { animate } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

interface CounterType {
  label: string;
  from: number;
  to: number
}

function FeatureCount({ label, from, to }: CounterType) {
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

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h4" component="h3" color="initial">{label}</Typography>
      <Typography variant="h5" component="h4" color="initial" ref={nodeRef} />
    </Paper>
  );
}

export default FeatureCount;
