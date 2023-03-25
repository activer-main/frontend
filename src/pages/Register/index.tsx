// RegisterScreen.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import Button from 'components/Button';
import { RegisterFormDataType } from 'types/user';
import FormInput from 'components/FormInput';
import { PASSWORD_PATTERN } from 'utils/pattern';
import './index.scss';
import { selectUserInfo } from 'store/auth/authSlice';
import { useRegisterMutation } from 'store/auth/authService';

function Register() {
  // selact redux data
  const navigate = useNavigate();
  const [register, {
    isSuccess, isError, isLoading, error,
  }] = useRegisterMutation();
  const userInfo = useAppSelector(selectUserInfo);

  if (isError) {
    alert((error as any).data.message);
  }

  if (isSuccess) {
    navigate('/login');
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & RegisterFormDataType;

    // check if passwords match
    if (target.password.value !== target.confirmPassword.value) {
      alert('Password mismatch');
      return;
    }

    register({
      username: target.username.value,
      email: target.email.value.toLowerCase(),
      password: target.password.value,
    });
  };

  useEffect(() => {
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/user/profile');
  }, [navigate, userInfo]);

  return (
    <form onSubmit={handleSubmit} className="register">
      <h1 className="register__header">註冊</h1>

      <FormInput
        type="text"
        label="使用者名稱"
        name="username"
        required
      />
      <FormInput
        label="帳號"
        type="email"
        name="email"
        required
      />
      <FormInput
        type="password"
        label="密碼"
        name="password"
        pattern={PASSWORD_PATTERN}
        required
      />

      <FormInput
        type="password"
        label="確認密碼"
        pattern={PASSWORD_PATTERN}
        name="confirmPassword"
        required
      />

      <div className="register__control">
        <Button
          type="submit"
          text={isLoading ? 'spin' : '註冊'}
          className="register__submit"
          disabled={isLoading}
        />
        <Button
          type="button"
          text="取消"
          variant={{ outline: true }}
          className="register__cancel"
          onClick={() => navigate('/login')}
          disabled={isLoading}
        />
      </div>

    </form>
  );
}
export default Register;
