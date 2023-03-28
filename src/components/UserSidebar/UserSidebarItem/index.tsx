import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import './index.scss';

interface UserSideBarItemType
  extends NavLinkProps {
  icon: React.ReactNode;
  label: string;
}

function UserSideBarItem({
  icon, label, className, ...props
}: UserSideBarItemType) {
  return (
    <NavLink
      {...props}
      className={`${className} user-sidebar-item`}

    >
      <div className="user-sidebar-item__icon">
        {icon}
      </div>
      {label}
    </NavLink>
  );
}

export default UserSideBarItem;
