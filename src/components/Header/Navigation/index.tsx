import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <Button onClick={() => navigate('/search')} className="nav__link">搜尋活動</Button>
      <Button onClick={() => navigate('/surf?sortBy=activityClickCount')} className="nav__link">熱門活動</Button>
      <Button onClick={() => navigate('/')} className="nav__link">活動分類</Button>
    </nav>
  );
}

export default Navigation;
