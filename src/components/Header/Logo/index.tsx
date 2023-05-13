import React from 'react';
import { SvgIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoIcon } from './logo.svg';

function Logo() {
  return (
    <Link to="/">
      <SvgIcon
        sx={{ fontSize: '3rem' }}
        color="secondary"
        component={LogoIcon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 31 32"
      />
    </Link>
  );
}

export default Logo;
