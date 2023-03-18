import React from 'react';
import useIsMobile from 'hooks/useIsMobile';
import { AiOutlineMenu } from 'react-icons/ai';
import Button from 'components/Button';
import Logo from './Logo';
import Navigation from './Navigation';
import LoginOutButton from './LoginOutButton';
import './index.scss';

function Haeder() {
  const isMobile = useIsMobile();

  return (
    <header className="header">
      <Logo />
      {!isMobile ? (
        <>
          <Navigation />
          <LoginOutButton />
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
