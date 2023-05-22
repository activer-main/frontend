import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from 'store';
import { logout, selectUserInfo } from 'store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { userNavigationItems } from 'pages/User/components/UserSidebar';

export default function UserAvatar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { username, avatar } = useAppSelector(selectUserInfo)!;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="帳戶管理">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={avatar || username || undefined} alt={username || 'avatar'} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* dropdown menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        {/* User navigation */}
        {Object.values(userNavigationItems).map((item, index) => (
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              navigate(item.link);
            }}
            key={index}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            {' '}
            {item.label}
          </MenuItem>
        ))}

        <Divider />

        {/* Logout */}
        <MenuItem onClick={() => {
          setAnchorEl(null);
          dispatch(logout());
        }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          登出
        </MenuItem>
      </Menu>
    </>
  );
}
