import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch, useAppSelector } from 'store';
import { userLogin } from 'store/auth/authAction';
import { toast } from 'react-toastify';

import LoadingButton from '@mui/lab/LoadingButton';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, userInfo } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    if (!userInfo) {
      navigate(-1);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(userLogin({
      email: data.get('email') as string,
      password: data.get('password') as string,
    }))
      .unwrap()
      .then(() => {
        navigate('/user/profile');
      })
      .catch((error: any) => {
        toast(error.message);
      });
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
          登入
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="帳戶"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="密碼"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <LoadingButton
            loading={loading}
            loadingPosition="end"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            登入
          </LoadingButton>

          <Grid container>
            <Grid item xs>
              <Link to="/">
                忘記密碼?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register">
                立即註冊
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </Container>

  );
}
