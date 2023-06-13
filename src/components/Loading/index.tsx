import React from 'react';
import './index.scss';
import { Container } from '@mui/material';

function Loading() {
  return (
    <Container>
      <div className="wrap">
        <div className="loading">
          <div className="bounceball" />
          <div className="text">LOADING...</div>
        </div>
      </div>
    </Container>
  );
}

export default Loading;
