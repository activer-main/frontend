import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

interface UserSideBarItemType {
  icon: React.ReactNode;
  label: string;
}

function UserSideBarItem({ icon, label }: UserSideBarItemType) {
  return (
    <NavLink
      className="user-sidebar-item"
      to="profile"
    >
      <div className="user-sidebar-item__icon">
        {icon}
      </div>
      {label}
    </NavLink>
  );
}

export default UserSideBarItem;
