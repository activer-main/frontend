import React from 'react';
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <div className="root">
      Root
      <Outlet />
    </div>
  );
}

export default Root;
