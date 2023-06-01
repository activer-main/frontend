import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material';
import { ConfirmProvider } from 'material-ui-confirm';
import { theme } from 'styles/theme';
import { useGetAuthtokenQuery } from 'store/user/userService';
import Loading from 'components/Loading';

function Root() {
  const { isLoading, isError } = useGetAuthtokenQuery(undefined, {
    pollingInterval: 2000000,
  });

  if (isLoading) return <Loading />;
  if (isError) {
    localStorage.removeItem('userToken');
  }

  return (
    <ThemeProvider theme={theme}>
      <ConfirmProvider>
        <ToastContainer />
        <Outlet />
      </ConfirmProvider>
    </ThemeProvider>

  );
}

export default Root;
