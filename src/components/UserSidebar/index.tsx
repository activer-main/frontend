import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { logout } from 'store/auth/authSlice';

import './index.scss';
import UserSideBarItem from './UserSidebarItem';

function UserSideBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = (event: React.SyntheticEvent) => {
    event.preventDefault();
    navigate('/login');
    dispatch(logout());
  };

  return (
    <div className="user-sidebar">
      <UserSideBarItem
        label="基本資料"
        icon={<FaUserAlt />}
        to="profile"
      />
      <UserSideBarItem
        label="活動管理"
        icon={<FaUserAlt />}
        to="manage?"
      />
      <UserSideBarItem
        label="登出"
        icon={<FaUserAlt />}
        to="/"
        onClick={handleLogout}
      />

    </div>
  );
}

export default UserSideBar;
