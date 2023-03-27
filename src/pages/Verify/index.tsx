import { getResendVerifyEmail } from 'api/user';
import Button from 'components/Button';
import FormInput from 'components/FormInput';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'store';
import { verifyUser } from 'store/auth/authAction';

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
    <form className="verify" onSubmit={handleSubmit}>
      <h1>驗證</h1>
      <FormInput
        label="驗證碼"
        name="verifyCode"
      />
      <div className="control">
        <Button text="驗證" type="submit" />
        <Button
          text="重新傳送"
          type="button"
          variant={{ outline: true }}
          onClick={handleResend}
        />
      </div>
    </form>
  );
}

export default Verify;
