// ProtectedRoute.js
import React from 'react';
import { useAppSelector } from 'store';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
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
