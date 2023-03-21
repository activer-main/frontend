import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/Header';
import { useGetUserDetailsQuery } from 'store/auth/authService';
import { setCredentials } from 'store/auth/authSlice';
import { useAppDispatch } from 'store';

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
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
