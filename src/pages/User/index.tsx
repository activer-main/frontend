import * as React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Avatar, Chip, CircularProgress, Container, Grid, Paper, Stack,
  Typography, useMediaQuery, useTheme,
} from '@mui/material';
import { useAppSelector } from 'store';
import { selectUserInfo } from 'store/user/userSlice';
import { useGetManageActivityQuery } from 'store/activity/activityService';
import TagIcon from '@mui/icons-material/Tag';

export default function PersistentDrawerLeft() {
  // const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const { avatar, username, professions } = useAppSelector(selectUserInfo)!;
  const { data: activityData, isLoading: isGettingActivity } = useGetManageActivityQuery({});
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl">
      <Paper sx={{ p: 4, mb: 3 }}>
        <Grid container>
          <Grid item xs={2} md={1} sx={{ mr: 2 }}>
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
          <Grid item xs={2} md={1}>
            <Stack direction={isMobile ? 'row' : 'column'}>
              <Typography
                variant={isMobile ? 'body1' : 'h5'}
                sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
              >
                收藏
              </Typography>
              {isGettingActivity ? <CircularProgress />
                : (
                  <Typography variant={isMobile ? 'body1' : 'h1'} color="secondary">
                    {activityData?.searchData?.length}
                  </Typography>
                )}
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Outlet />
    </Container>
  );
}
