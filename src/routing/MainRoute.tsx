import Haeder from 'components/Header';
import { Outlet } from 'react-router-dom';
import React from 'react';

function MainRoute() {
  return (
    <>
      <Haeder />
      <Outlet />
    </>
  );
}

export default MainRoute;
