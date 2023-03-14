import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="nav">
      <NavLink to="/">搜尋活動</NavLink>
      <NavLink to="/">熱門活動</NavLink>
      <NavLink to="/">活動分類</NavLink>
    </nav>
  );
}

export default Navigation;
