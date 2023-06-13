import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Divider, ThemeProvider } from '@mui/material';
import { ConfirmProvider } from 'material-ui-confirm';
import { theme } from 'styles/theme';
import Loading from 'components/Loading';
import { useTokenLoginQuery } from 'store/user/endpoints/tokenLogin';
import Haeder from 'components/Header';

function Root() {
  const { isLoading, isError } = useTokenLoginQuery(undefined, {
    pollingInterval: 2000000,
  });

  if (isError) {
    localStorage.removeItem('userToken');
  }

  return (
    <ThemeProvider theme={theme}>
      <ConfirmProvider>
        <ToastContainer />
        <Haeder />
        <Divider sx={{ mb: 2 }} />
        {(isLoading) ? <Loading />
          : <Outlet />}
      </ConfirmProvider>
    </ThemeProvider>

  );
}

export default Root;
