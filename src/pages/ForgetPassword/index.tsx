import React from 'react';
import {
  Avatar, Box, Container, CssBaseline, InputAdornment, Link, TextField, Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import { AccountCircle } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EMAIL_PATTERN } from 'utils/pattern';
import { forgetPassword } from 'store/user/userAPI';

function ForgetPassword() {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    await forgetPassword(data.email)
      .then(() => setLoading(false))
      .then(() => toast.success('若電子郵件地址正確，已將驗證信傳至信箱中!'))
      .catch((e: any) => {
        setLoading(false);
        toast.error(e.data.message);
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          忘記密碼
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            error={!!errors.email}
            helperText={errors.email ? '請輸入有效的電子郵件地址' : undefined}
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

          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            送出
          </LoadingButton>

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
            取消
          </Link>
        </Box>
      </Box>

    </Container>
  );
}

export default ForgetPassword;
