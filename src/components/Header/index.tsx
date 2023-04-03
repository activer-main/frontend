import React from 'react';
import useIsMobile from 'hooks/useIsMobile';
import { AiOutlineMenu } from 'react-icons/ai';
import Button from 'components/Button';
import { useAppDispatch, useAppSelector } from 'store';
import { logout } from 'store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import Logo from './Logo';
import Navigation from './Navigation';

import './index.scss';

function Haeder() {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  return (
    <header className="header">

      {/* Logo */}
      <Logo />

      {/* Navigation */}
      {!isMobile ? (
        <>
          <Navigation />
          {userInfo ? (
            <>
              <UserAvatar avatar={userInfo.avatar} />
              <Button
                className="header__logout"
                text="登出"
                onClick={() => dispatch(logout())}
              />
            </>
          )
            : <Button text="登入/註冊" onClick={() => navigate('/login')} />}
        </>
      )
        : (
          <Button
            color="white"
            iconBefore={<AiOutlineMenu />}
          />
        )}
    </header>
  );
}

export default Haeder;
