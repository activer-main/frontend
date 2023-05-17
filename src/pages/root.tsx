import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material';
import { theme } from 'styles/theme';
import { useGetAuthtokenQuery } from 'store/user/userService';
import Loading from 'components/Loading';

function Root() {
  const { isLoading } = useGetAuthtokenQuery(undefined, {
    pollingInterval: 2000000,
  });

  if (isLoading) return <Loading />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Outlet />
    </ThemeProvider>

  );
}

export default Root;
