import React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Person2Icon from '@mui/icons-material/Person2';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from 'store';
import { logout } from 'store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stack, Typography, useMediaQuery,
} from '@mui/material';
import Logo from 'components/Header/Logo';
import HistoryIcon from '@mui/icons-material/History';

export const drawerWidth = 200;

export const userNavigationItems = {
  profile: {
    label: '基本資料',
    link: '/user/profile',
    icon: <Person2Icon />,
  },
  manage: {
    label: '活動管理',
    link: '/user/manage',
    icon: <ManageSearchIcon />,
  },
  history: {
    label: '搜尋紀錄',
    link: '/user/history',
    icon: <HistoryIcon />,
  },
};

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface UserDrawerType {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

function UserDrawer({ setOpen, open } : UserDrawerType) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSmall = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>

      {/* Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant={isSmall ? 'persistent' : 'temporary'}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        {/* Header */}
        <DrawerHeader sx={{ justifyContent: 'space-between' }}>
          <Stack alignItems="center" spacing={1} direction="row" component="a" href="/" sx={{ textDecoration: 'none', ml: 1 }}>
            <Box sx={{ fontSize: '2em' }}>
              <Logo />
            </Box>
            <Typography variant="h5" color="secondary">ctiver</Typography>
          </Stack>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        {/* Link Item */}
        <List>
          {Object.values(userNavigationItems).map((item) => (
            <ListItem key={item.label}>
              <ListItemButton onClick={() => navigate(item.link)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Control */}
        <List>
          <ListItem>
            <ListItemButton onClick={() => dispatch(logout())}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="登出" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default UserDrawer;
