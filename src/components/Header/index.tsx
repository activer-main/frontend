import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import LoginOutButton from './LoginOutButton';

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
