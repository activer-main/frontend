// ProtectedRoute.js
import React from 'react';
import { useAppSelector } from 'store';
import { NavLink, Outlet } from 'react-router-dom';
import Verify from 'pages/Verify';

function ProtectedRoute() {
  const { userInfo } = useAppSelector((state) => state.auth);

  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <div className="unauthorized">
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to="/login">Login</NavLink>
          {' '}
          to gain access
        </span>
      </div>
    );
  }

  if (!userInfo.verify) {
    return <Verify />;
  }

  // returns child route elements
  return <Outlet />;
}
export default ProtectedRoute;
