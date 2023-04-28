import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Container from '@mui/material/Container';
import { useAppDispatch, useAppSelector } from 'store';
import { selectUserData } from 'store/auth/authSlice';
import { toast } from 'react-toastify';
import { registerUser } from 'store/auth/authAction';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const { loading } = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      data.get('password') !== data.get('confirmPassword')
    ) {
      toast.error('密碼不相同');
      return;
    }

    dispatch(registerUser({
      username: data.get('username') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
    }))
      .unwrap()
      .then(() => {
        toast.success('註冊成功，請重新登入!');
        navigate('/login');
      })
      .catch((error: any) => toast.error(error.message));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                label="使用者名稱"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="帳號"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="密碼"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="確認密碼"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
              />
            </Grid>

          </Grid>
          <LoadingButton
            loading={loading}
            loadingPosition="end"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end" data-testId="cancel-button">
            <Grid item>
              <Link to="/login">
                已有帳號? 立即登入
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
