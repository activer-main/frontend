import React from 'react';
import useIsMobile from 'hooks/useIsMobile';
import { useAppSelector } from 'store';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import {
  Container,
} from '@mui/material';
import Logo from './Logo';
import Navigation from './Navigation';
import UserAvatar from './UserAvatar';
import MobileNavigation from './MobileNavigation';

function Haeder() {
  const isMobile = useIsMobile();
  const { userInfo } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}
      >
        {/* Logo */}

        <Logo />

        {/* Navigation */}
        {!isMobile ? <Navigation />
          : <MobileNavigation />}

        {/* Login-out */}

        {userInfo
          ? <UserAvatar />
          : (
            <Button
              startIcon={<LoginIcon />}
              onClick={() => navigate('/login')}
              variant="contained"
            >
              登入
            </Button>
          )}
      </Box>
    </Container>
  );
}

export default Haeder;
