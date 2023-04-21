import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenLogin } from 'store/auth/authAction';
import { ThemeProvider } from '@mui/material';
import { theme } from 'styles/theme';

function Root() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tokenLogin());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Outlet />
    </ThemeProvider>

  );
}

export default Root;
