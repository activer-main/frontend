import React from 'react';
import { FaUserAlt } from 'react-icons/fa';

import './index.scss';
import UserSideBarItem from './UserSidebarItem';

function UserSideBar() {
  return (
    <div className="user-sidebar">
      <UserSideBarItem label="基本資料" icon={<FaUserAlt />} />
    </div>
  );
}

export default UserSideBar;
