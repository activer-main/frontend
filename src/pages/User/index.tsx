import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import {
  Avatar, Chip, CircularProgress, Grid, Paper, Stack, Typography,
} from '@mui/material';
import { useAppSelector } from 'store';
import { selectUserInfo } from 'store/user/userSlice';
import { useGetManageActivityQuery } from 'store/activity/activityService';
import TagIcon from '@mui/icons-material/Tag';
import UserSidebar, { DrawerHeader, drawerWidth } from './components/UserSidebar';
import UserHeader from './components/UserHeader';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: '100vw',
  marginLeft: `-${drawerWidth}px`,
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export default function PersistentDrawerLeft() {
  const [open, setOpen] = React.useState(false);
  const { avatar, username, professions } = useAppSelector(selectUserInfo)!;
  const { data: activityData, isLoading: isGettingActivity } = useGetManageActivityQuery({});

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <UserHeader open={open} setOpen={setOpen} />
      <UserSidebar open={open} setOpen={setOpen} />

      <Main open={open}>
        <DrawerHeader />
        <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
          <Grid container>
            <Grid item xs={1}>
              <Avatar
                src={avatar || undefined}
                sx={{
                  width: '100%',
                  height: 'auto',
                  border: '4px solid white',
                  backgroundColor: 'white',
                }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h4">{username}</Typography>
              <Stack direction="row" spacing={2}>
                {professions?.map((p) => (
                  <Chip
                    key={p.id}
                    label={p.profession}
                    icon={<TagIcon />}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack>
                <Typography
                  variant="h5"
                  color="secondary"
                  sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
                >
                  目前收藏
                </Typography>
                {isGettingActivity ? <CircularProgress />
                  : (
                    <Typography variant="h1">
                      {activityData?.searchData?.length}
                    </Typography>
                  )}
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        <Outlet />
      </Main>
    </Box>
  );
}
