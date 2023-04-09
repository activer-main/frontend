import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { logout } from 'store/auth/authSlice';
import { AiFillHome } from 'react-icons/ai';
import { RiTaskFill, RiLogoutBoxFill } from 'react-icons/ri';
import UserSideBarItem from './UserSidebarItem';
import './index.scss';

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
        label="首頁"
        icon={<AiFillHome />}
        to="/"
      />
      <UserSideBarItem
        label="基本資料"
        icon={<FaUserAlt />}
        to="profile"
      />
      <UserSideBarItem
        label="活動管理"
        icon={<RiTaskFill />}
        to="manage?"
      />
      <UserSideBarItem
        label="登出"
        icon={<RiLogoutBoxFill />}
        to="/"
        onClick={handleLogout}
      />

    </div>
  );
}

export default UserSideBar;
