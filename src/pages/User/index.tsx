import React from 'react';
import { Outlet } from 'react-router-dom';

function User() {
  return (
    <div className="user">
      <h1>User</h1>
      <Outlet />
    </div>
  );
}

export default User;
