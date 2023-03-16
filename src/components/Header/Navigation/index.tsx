import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav__link">搜尋活動</NavLink>
      <NavLink to="/" className="nav__link">熱門活動</NavLink>
      <NavLink to="/" className="nav__link">活動分類</NavLink>
    </nav>
  );
}

export default Navigation;
