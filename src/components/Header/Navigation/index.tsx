import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import navigations from '../navigations';

function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="nav">
      {navigations.map((nav) => (
        <Button onClick={() => navigate(nav.link)}>{nav.label}</Button>
      ))}
    </nav>
  );
}

export default Navigation;
