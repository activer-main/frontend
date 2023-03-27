// ProtectedRoute.js
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'store';
import { Navigate, Outlet } from 'react-router-dom';

import { setCredentials } from 'store/auth/authSlice';
import { useGetUserDetailsQuery } from 'store/auth/authService';

function ProtectedRoute() {
  const dispatch = useAppDispatch();

  const { data } = useGetUserDetailsQuery('userDetails', {
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);
  const { userInfo } = useAppSelector((state) => state.auth);

  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <Navigate to="/login" />
    );
  }

  if (!userInfo.verify) {
    return (
      <Navigate to="/verify" />
    );
  }
  // returns child route elements
  return <Outlet />;
}
export default ProtectedRoute;
