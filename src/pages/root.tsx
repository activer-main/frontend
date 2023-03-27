import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useGetUserDetailsQuery } from 'store/auth/authService';
import { setCredentials } from 'store/auth/authSlice';
import { useAppDispatch } from 'store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Root() {
  const dispatch = useAppDispatch();

  const { data } = useGetUserDetailsQuery('userDetails', {
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default Root;
