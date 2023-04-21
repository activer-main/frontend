import React from 'react';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import HouseIcon from '@mui/icons-material/House';
import Button from '@mui/material/Button';
import { drawerListItem, drawerWidth } from '../UserSidebar';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;

}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface UserHeaderType {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

function UserHeader({ setOpen, open } : UserHeaderType) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = React.useState('Welcome');
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    try {
      setTitle(drawerListItem[pathname.split('/')[2] as keyof typeof drawerListItem].label);
    } catch {
      setTitle('Welcome');
    }
  }, [pathname]);

  return (

    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>{title}</Typography>
        <Button color="inherit" startIcon={<HouseIcon />} onClick={() => navigate('/')}>返回首頁</Button>
      </Toolbar>
    </AppBar>
  );
}

export default UserHeader;
