import React from 'react';
import { SvgIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LogoIcon } from './logo.svg';

function Logo() {
  const navigate = useNavigate();

  return (
    <SvgIcon
      color="secondary"
      fontSize="inherit"
      component={LogoIcon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 31 32"
      onClick={() => navigate('/')}
    />
  );
}

export default Logo;
