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
import { useAppSelector } from 'store';
import { selectUserData } from 'store/user/userSlice';
import { toast } from 'react-toastify';
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
import {
  EMAIL_HELPERTEXT,
  EMAIL_PATTERN, PASSWORD_HELPERTEXT, PASSWORD_PATTERN, USERNAME_HELPERTEXT, USERNAME_PATTERN,
} from 'utils/pattern';
import { useForm } from 'react-hook-form';
import { SignupRequest, useSignupMutation } from 'store/user/endpoints/signup';

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { loading } = useAppSelector(selectUserData);
  const {
    register, handleSubmit, watch, formState: { errors },
  } = useForm<SignupRequest>();
  const [signup] = useSignupMutation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit = handleSubmit((data) => {
    signup(data)
      .unwrap()
      .then(() => {
        navigate('/user/profile');
      })
      .catch((error: any) => toast.error(error.message));
  });

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
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={!!errors.username}
                helperText={errors.username ? USERNAME_HELPERTEXT : undefined}
                autoComplete="username"
                required
                fullWidth
                id="username"
                label="使用者名稱"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BorderColorIcon />
                    </InputAdornment>
                  ),
                }}
                {...register('username', {
                  required: true,
                  pattern: USERNAME_PATTERN,
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={!!errors.email}
                helperText={errors.email ? EMAIL_HELPERTEXT : undefined}
                fullWidth
                required
                id="email"
                label="帳號"
                autoComplete="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                {...register('email', {
                  required: true,
                  pattern: EMAIL_PATTERN,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.password}
                helperText={errors.password
                  ? PASSWORD_HELPERTEXT
                  : undefined}
                fullWidth
                required
                label="密碼"
                {... register('password', {
                  required: true,
                  pattern: PASSWORD_PATTERN,
                })
                }
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
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword ? '密碼需相同' : undefined}
                fullWidth
                required
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
                {...register('confirmPassword', {
                  required: true,
                  validate: (val: string) => watch('password') === val || '密碼需相同'
                  ,
                })}
              />
            </Grid>

          </Grid>
          <LoadingButton
            loading={loading}
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
