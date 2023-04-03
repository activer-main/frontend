import React, { useRef, useState } from 'react';
import useOutsideClick from 'hooks/useOutsideClick';
import { NavLink } from 'react-router-dom';
import { UserInfoType } from 'types/user';
import './index.scss';
import { FaUserCircle } from 'react-icons/fa';

function UserAvatar({ avatar }: Pick<UserInfoType, 'avatar'>) {
  const [showUserNavigation, setShowUserNavigation] = useState<boolean>(false);
  const UserNavigationRef = useRef<HTMLDivElement>(null);
  useOutsideClick(UserNavigationRef, () => setShowUserNavigation(false));

  return (
    <div
      className="avatar"
      onClick={
        () => setShowUserNavigation(true)
      }
      ref={UserNavigationRef}
      aria-hidden
    >
      {avatar
        ? (
          <img
            src={`${URL}${avatar}`}
            alt="user-avatar"
            className="avatar__img"
          />
        )
        : <FaUserCircle className="avatar__img" />}
      {showUserNavigation && (
        <div className="avatar__navigation">
          <NavLink
            to="/user/profile"
            className="avatar__item"
          >
            基本資料
          </NavLink>
          <NavLink
            to="/user/manage"
            className="avatar__item"
          >
            活動管理
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default UserAvatar;
