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
import { useNavigate } from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Link from '@mui/material/Link';
import {
  IconButton, InputAdornment,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockClockIcon from '@mui/icons-material/LockClock';
import { USERNAME_PATTERN } from 'utils/pattern';
import _ from 'lodash';

export default function Register() {
  const { loading } = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [validateError, setValidateError] = React.useState<string[]>([]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
        navigate('/user/profile');
      })
      .catch((error: any) => toast.error(error.message));
  };

  const handleValidate = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.name === 'username') {
      if (event.target.value.match(USERNAME_PATTERN)) {
        setValidateError(_.filter(validateError, (item) => item !== 'username'));
      } else {
        setValidateError(_.uniq(_.concat(validateError, event.target.name)));
      }
    }
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          註冊
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={validateError.includes('username')}
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                label="使用者名稱"
                helperText="使用者名稱須為2-16字中英數字"
                autoFocus
                inputProps={{
                  pattern: USERNAME_PATTERN,
                  startAdornment: (
                    <InputAdornment position="start">
                      <BorderColorIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => handleValidate(e)}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="密碼"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end" sx={{ mr: 1 }}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                label="確認密碼"
                id="confirmPassword"
                autoComplete="new-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockClockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end" sx={{ mr: 1 }}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
            註冊
          </LoadingButton>
          <Grid container justifyContent="flex-end" alignItems="flex-end" spacing={1}>
            <Grid item>
              已有帳號?
            </Grid>
            <Grid item>
              <Link
                component="button"
                underline="none"
                sx={{
                  color: 'secondary.main',
                  '&:hover': {
                    color: 'secondary.dark',
                  },
                }}
                onClick={() => navigate('/login')}
              >
                立即登入
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
