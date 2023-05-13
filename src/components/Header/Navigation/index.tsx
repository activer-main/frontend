import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import navigations from '../navigations';

function Navigation() {
  const navigate = useNavigate();

  return (
    <Stack component="nav" spacing={1} direction="row">
      {navigations.map((nav, index) => (
        <Button onClick={() => navigate(nav.link)} key={index}>{nav.label}</Button>
      ))}
    </Stack>
  );
}

export default Navigation;
