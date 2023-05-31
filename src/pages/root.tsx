import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material';
import { ConfirmProvider } from 'material-ui-confirm';
import { theme } from 'styles/theme';
import { useGetAuthtokenQuery } from 'store/user/userService';
import Loading from 'components/Loading';

export function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

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
        <ScrollToTop />
        <ToastContainer />
        <Outlet />
      </ConfirmProvider>
    </ThemeProvider>

  );
}

export default Root;
