import React from 'react';
import './index.scss';

function Loading() {
  return (
    <div className="loading-body">
      <div className="wrap">
        <div className="loading">
          <div className="bounceball" />
          <div className="text">LOADING...</div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
