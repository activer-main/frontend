/* eslint-disable */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';
import { userLogin } from 'store/auth/authAction';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { selectUserInfo } from 'store/auth/authSlice';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, Link } from '@mui/material';
import {EMAIL_PATTERN, PASSWORD_PATTERN} from 'utils/pattern'

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfo = useAppSelector(selectUserInfo);
  const { loading } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    dispatch(userLogin(data))
      .unwrap()
      .then(() => {
        const next =localStorage.getItem('next')
        if(next){
          navigate(next)
        }
        navigate('/');
      })
      .catch((error: any) => {
        toast(error.message);
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  React.useEffect(() => {
    if (userInfo) {
      navigate('/user/profile');
    }
  }, [userInfo]);

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
          登入
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            error={!!errors.email}
            helperText={errors.email ? '請輸入有效的電子郵件地址': undefined}
            margin="normal"
            required
            fullWidth
            id="email"
            label="帳戶"
            autoComplete="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            {...register('email', { required: true, pattern: EMAIL_PATTERN })}
          />
          <TextField
            error={errors.password ? true: false}
            helperText={errors.password ? '密碼必須包含至少一個小寫字母、一個大寫字母、一個數字和一個特殊字符（!@#$%），並且長度在8到24個字符之間。': undefined}
            margin="normal"
            required
            fullWidth
            label="密碼"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
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
            {...register('password', { 
              required: true,
              pattern: PASSWORD_PATTERN
            
            })}
          />

          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            登入
          </LoadingButton>

          <Grid container>
            <Grid item xs>
              <Link
                component="button"
                underline="none"
                sx={{
                  color: 'secondary.main',
                  '&:hover': {
                    color: 'secondary.dark',
                  },
                }}
                onClick={() => navigate('/')}
              >
                立即註冊
              </Link>
            </Grid>
            <Grid item>
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
                    onClick={() => navigate('/register')}
                  >
                    立即註冊
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </Container>

  );
}
/* eslin-enable */
