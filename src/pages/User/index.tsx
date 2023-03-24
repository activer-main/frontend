import React from 'react';
import UserSideBar from 'components/UserSidebar';
import { Outlet } from 'react-router-dom';
import './index.scss';

function User() {
  return (

    <div className="user">
      <UserSideBar />
      <div className="user__main">
        <Outlet />
      </div>
    </div>
  );
}

export default User;
