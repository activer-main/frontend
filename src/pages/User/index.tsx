import * as React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Chip, CircularProgress, Container, Grid, Paper, Stack,
  TextField,
  Typography, useMediaQuery, useTheme,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store';
import { selectUpdateUserInfo, selectUserInfo, setUserInfo } from 'store/user/userSlice';
import { useGetManageActivityQuery } from 'store/activity/activityService';
import TagIcon from '@mui/icons-material/Tag';
import { toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { USERNAME_HELPERTEXT, USERNAME_PATTERN } from 'utils/pattern';
import { UserUpdateRequestType } from 'types/request';
import { useUpdateUserMutation } from 'store/user/userService';
import AvatarUpload from './Profile/components/AvatarUpload';

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const { username, professions } = useAppSelector(selectUserInfo)!;
  const updateUserInfo = useAppSelector(selectUpdateUserInfo);

  const { data: activityData, isLoading: isGettingActivity } = useGetManageActivityQuery({});
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<UserUpdateRequestType>();
  const onSubmit: SubmitHandler<UserUpdateRequestType> = async () => {
    await updateUser(updateUserInfo)
      .unwrap()
      .then(() => toast.success('修改成功!'))
      .catch((e: any) => toast.error(e.data.message));
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 2 }}>
      <Paper sx={{ p: 4, mb: 3 }} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={2} md={1} sx={{ mr: 2 }}>
            <AvatarUpload />
          </Grid>
          <Grid item xs>
            <TextField
              error={!!errors.username}
              helperText={errors.username ? USERNAME_HELPERTEXT : undefined}
              sx={{
                '& input': {
                  fontSize: '2rem',
                  fontWeight: 'bold',
                },
              }}
              variant="standard"
              value={username || ''}
              {...register('username', {
                required: true,
                pattern: USERNAME_PATTERN,
                onChange: (e) => dispatch(setUserInfo({ key: 'username', value: e.target.value })),
              })}
              InputProps={
                {
                  endAdornment: isLoading ? <CircularProgress /> : undefined,
                }
              }
            />
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
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
                  <Typography variant={isMobile ? 'body1' : 'h2'} color="secondary">
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
