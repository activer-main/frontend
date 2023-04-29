import { getResendVerifyEmail } from 'store/auth/authAPI';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'store';
import { verifyUser } from 'store/auth/authAction';
import {
  Container, Typography, TextField, Stack,
} from '@mui/material';
import { selectUserData, selectUserInfo } from 'store/auth/authSlice';
import { LoadingButton } from '@mui/lab';

function Verify() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfo = useAppSelector(selectUserInfo);
  const { loading, error } = useAppSelector(selectUserData);
  const [resendLoading, setResendLoading] = React.useState(false);

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
    ).unwrap().then(() => toast.success('驗證成功'))
      .catch(() => toast.error(error.message));
  };

  const handleResend = async () => {
    try {
      setResendLoading(true);
      await getResendVerifyEmail()
        .then(() => setResendLoading(false));
      toast.success('已發送驗證碼至信箱');
    } catch (e: any) {
      toast.error(e.message);
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
        <LoadingButton type="submit" variant="contained" loading={loading}>驗證</LoadingButton>

        <LoadingButton
          loading={resendLoading}
          type="button"
          variant="outlined"
          onClick={handleResend}
        >
          重新傳送
        </LoadingButton>
      </Stack>
    </Container>
  );
}

export default Verify;
