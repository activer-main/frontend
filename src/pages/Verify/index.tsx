import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from 'store';
import {
  Container, Typography, TextField, Stack, Avatar, Box,
} from '@mui/material';
import { selectUserInfo } from 'store/user/userSlice';
import { LoadingButton } from '@mui/lab';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useVerifyMutation } from 'store/user/endpoints/verify';
import { useLazyResendVerifyEmailQuery } from 'store/user/endpoints/resendVerifyEmail';

function Verify() {
  const navigate = useNavigate();
  const userInfo = useAppSelector(selectUserInfo);
  const [verify, { isLoading: isVerifying }] = useVerifyMutation();
  const [resendVerify, { isLoading: isResending }] = useLazyResendVerifyEmailQuery();

  React.useEffect(() => () => {
    if (!userInfo) {
      toast.error('使用者未驗證，請先登入!');
      navigate('/login');
    }

    if (userInfo?.emailVerified) {
      navigate('/user/profile');
    }
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & { verifyCode: { value: string } };
    verify({
      verifyCode: target.verifyCode.value,
    })
      .unwrap().then(() => toast.success('驗證成功'));
  };

  const handleResend = () => {
    resendVerify({})
      .unwrap()
      .then(() => toast.success('已發送驗證碼至信箱'));
  };

  return (
    <Container
      maxWidth="xs"
      component="form"
      onSubmit={handleSubmit}
    >
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
        {/* title */}
        <Typography component="h1" variant="h4">
          驗證
        </Typography>

        {/* input */}
        <TextField
          label="驗證碼"
          name="verifyCode"
          sx={{ mt: 2, mb: 1 }}
          required
        />

        {/* control */}
        <Stack spacing={2} direction="row">
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isVerifying}
          >
            驗證

          </LoadingButton>

          <LoadingButton
            loading={isResending}
            type="button"
            variant="outlined"
            onClick={handleResend}
          >
            重新傳送
          </LoadingButton>
        </Stack>

      </Box>
    </Container>

  );
}

export default Verify;
