import React from 'react';
import {
  Avatar, Box, Container, CssBaseline, InputAdornment, Link, TextField, Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import { AccountCircle } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PASSWORD_PATTERN } from 'utils/pattern';
import { resetPassword } from 'store/user/userAPI';

function ResetPassword() {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams()[0];

  const onSubmit = async (data: any) => {
    setLoading(true);
    if ((!searchParams.get('email')) || (!searchParams.get('token'))) {
      toast.error('參數錯誤，請提供token及電子郵件');
    } else {
      await resetPassword({
        email: searchParams.get('email')!,
        password: data.password,
        token: searchParams.get('token')!,
      })
        .then(() => setLoading(false))
        .then(() => toast.success('成功更新密碼!'))
        .catch((e: any) => {
          toast.error(e.response.data.message);
        });
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
          重設密碼
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            error={!!errors.password}
            helperText={errors.password ? '請輸入有效' : undefined}
            margin="normal"
            required
            fullWidth
            label="新密碼"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            {...register('password', { required: true, pattern: PASSWORD_PATTERN })}
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

export default ResetPassword;
