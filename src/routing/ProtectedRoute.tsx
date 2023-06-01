// ProtectedRoute.js
import React from 'react';
import { useAppSelector } from 'store';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetAuthtokenQuery } from 'store/user/userService';
import Loading from 'components/Loading';
import { toast } from 'react-toastify';
import { Divider } from '@mui/material';
import Header from 'components/Header';

function ProtectedRoute() {
  const { isLoading } = useGetAuthtokenQuery();

  const { userInfo } = useAppSelector((state) => state.user);

  // render Loading when token login request
  if (isLoading) return <Loading />;

  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    toast.error('使用者未驗證，請先登入!');
    return (
      <Navigate to="/login" />
    );
  }

  if (!userInfo.emailVerified) {
    return (
      <Navigate to="/verify" />
    );
  }
  // returns child route elements
  return (
    <>
      <Header />
      <Divider sx={{ mb: 2 }} />
      <Outlet />
    </>
  );
}
export default ProtectedRoute;
