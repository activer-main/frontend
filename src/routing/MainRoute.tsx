import Haeder from 'components/Header';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { Divider } from '@mui/material';

function MainRoute() {
  return (
    <>
      <Haeder />
      <Divider sx={{ mb: 2 }} />
      <Outlet />
    </>
  );
}

export default MainRoute;
