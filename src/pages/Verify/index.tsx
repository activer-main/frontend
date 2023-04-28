import { getResendVerifyEmail } from 'api/user';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'store';
import { verifyUser } from 'store/auth/authAction';
import {
  Button, Container, Typography, TextField, Box,
} from '@mui/material';

function Verify() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & { verifyCode: { value: string } };
    try {
      await dispatch(
        verifyUser({
          verifyCode: target.verifyCode.value,
        }),
      ).unwrap();
      navigate('/user/profile');
    } catch (error: any) {
      toast.error(error.message);
    }
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
      <Typography variant="h2" color="initial">驗證</Typography>

      {/* input */}
      <TextField
        label="驗證碼"
        name="verifyCode"
        data-testId="verifyCode-input"
      />

      {/* control */}
      <Box sx={{ justifyContent: 'space-between' }}>
        <Button type="submit">驗證</Button>

        <Button
          type="button"
          variant="outlined"
          onClick={handleResend}
        >
          重新傳送
        </Button>
      </Box>
    </Container>
  );
}

export default Verify;
