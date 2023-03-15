import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import LoginOutButton from './LoginOutButton';
import './index.scss';

function Haeder() {
  return (
    <header className="header">
      <Logo />
      <Navigation />
      <LoginOutButton />
    </header>
  );
}

export default Haeder;
