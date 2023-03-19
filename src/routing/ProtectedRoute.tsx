// ProtectedRoute.js
import React from 'react';
import { useAppSelector } from 'store';
import { NavLink, Outlet } from 'react-router-dom';

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

  // returns child route elements
  return <Outlet />;
}
export default ProtectedRoute;
