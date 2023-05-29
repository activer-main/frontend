import React from 'react';
import useIsMobile from 'hooks/useIsMobile';
import { useAppSelector } from 'store';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import {
  Container, Stack, Typography,
} from '@mui/material';
import Logo from './Logo';

import Navigation from './Navigation';
import UserAvatar from './UserAvatar';
import MobileNavigation from './MobileNavigation';

function Haeder() {
  const isMobile = useIsMobile();
  const { userInfo } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ p: 1 }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}
      >
        {/* Logo */}

        <Stack direction="row" alignItems="baseline" spacing={4}>
          <Box
            sx={{
              fontSize: '3em',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
              gap: '0.3em',
              cursor: 'pointer',
            }}
            component="a"
            onClick={() => navigate('/')}
          >
            <Logo />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.2em',
              }}
            >
              ctiver
            </Typography>
          </Box>

          {/* Navigation */}
          {!isMobile ? <Navigation />
            : <MobileNavigation />}
        </Stack>

        {/* Login-out */}

        {userInfo
          ? <UserAvatar />
          : (
            <Button
              startIcon={<LoginIcon />}
              onClick={() => navigate('/login')}
              variant="text"
            >
              登入 / 註冊
            </Button>
          )}
      </Box>

    </Container>
  );
}

export default Haeder;
