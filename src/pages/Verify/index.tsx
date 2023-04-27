import { getResendVerifyEmail } from 'store/auth/authAPI';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'store';
import { verifyUser } from 'store/auth/authAction';
import {
  Button, Container, Typography, TextField, Stack,
} from '@mui/material';
import { selectUserInfo } from 'store/auth/authSlice';

function Verify() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfo = useAppSelector(selectUserInfo);

  React.useEffect(() => () => {
    if (userInfo?.emailVerified) {
      navigate('/user/profile');
    }
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & { verifyCode: { value: string } };
    await dispatch(
      verifyUser({
        verifyCode: target.verifyCode.value,
      }),
    ).unwrap().then(() => navigate('/user/profile'));
  };

  const handleResend = async () => {
    try {
      await getResendVerifyEmail();
      toast.success('已發送驗證碼至信箱');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Container maxWidth="md" component="form" onSubmit={handleSubmit}>
      {/* title */}
      <Typography variant="h3">驗證</Typography>

      {/* input */}
      <TextField
        label="驗證碼"
        name="verifyCode"
        sx={{ mt: 2, mb: 1 }}
        required
      />

      {/* control */}
      <Stack spacing={2} direction="row">
        <Button type="submit" variant="contained">驗證</Button>

        <Button
          type="button"
          variant="outlined"
          onClick={handleResend}
        >
          重新傳送
        </Button>
      </Stack>
    </Container>
  );
}

export default Verify;
