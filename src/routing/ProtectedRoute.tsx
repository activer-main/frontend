// ProtectedRoute.js
import React from 'react';
import { useAppSelector } from 'store';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetAuthtokenQuery } from 'store/auth/authService';
import Loading from 'components/Loading';

function ProtectedRoute() {
  const { isLoading } = useGetAuthtokenQuery();

  const { userInfo } = useAppSelector((state) => state.auth);

  // render Loading when token login request
  if (isLoading) return <Loading />;

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
