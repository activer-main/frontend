import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { selectUserData } from 'store/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenLogin } from 'store/auth/authAction';
import Loading from 'components/Loading';

function Root() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selectUserData);

  useEffect(() => {
    dispatch(tokenLogin());
  }, []);

  return (
    <>
      <ToastContainer />
      {loading
        ? <Loading />
        : <Outlet />}
    </>
  );
}

export default Root;
