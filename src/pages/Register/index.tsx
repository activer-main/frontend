// RegisterScreen.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import Button from 'components/Button';
import { registerUser } from
  'store/auth/authAction';
import { RegisterFormDataType } from 'types/user';
import FormInput from 'components/FormInput';
import { PASSWORD_PATTERN } from 'utils/pattern';
import './index.scss';
import { toast } from 'react-toastify';

function Register() {
  const {
    loading, userInfo, success,
  } = useAppSelector(
    (state) => state.auth,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & RegisterFormDataType;

    // check if passwords match
    if (target.password.value !== target.confirmPassword.value) {
      toast.error('密碼不相同');
    }

    dispatch(registerUser({
      username: target.username.value,
      email: target.email.value.toLowerCase(),
      password: target.password.value,
    }));
  };

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate('/login');
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/user/profile');
  }, [navigate, userInfo, success]);

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
          text={loading ? 'spin' : '註冊'}
          className="register__submit"
          disabled={loading}
        />
        <Button
          type="button"
          text="取消"
          variant={{ outline: true }}
          className="register__cancel"
          onClick={() => navigate('/login')}
          disabled={loading}
        />
      </div>

    </form>
  );
}
export default Register;
