import React from 'react';
import { useAppDispatch } from 'store';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import FormInput from 'components/FormInput';
import { LoginFormDataType } from 'types/user';
import './index.scss';
import { PASSWORD_PATTERN } from 'utils/pattern';
import { useLoginMutation } from 'store/auth/authService';
import { setCredentials } from 'store/auth/authSlice';
// import { setCredentials } from 'store/auth/authSlice';

function Login() {
  const [login, {
    data, isError, error, isLoading, isSuccess,
  }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (isError) {
    console.error(error);
  }

  if (isSuccess) {
    dispatch(setCredentials(data!));
    navigate('/user/profile');
    localStorage.setItem('userToken', data!.token.accessToken);
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & LoginFormDataType;
    login({
      email: target.email.value,
      password: target.password.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="login">
      <h1 className="login__header">登入</h1>

      <FormInput
        className="login__account"
        name="email"
        label="帳號"
        type="email"
        title="請輸入正確帳號格式"
        required
      />

      <FormInput
        className="login__password"
        name="password"
        label="密碼"
        type="password"
        pattern={PASSWORD_PATTERN}
        title="密碼至少八位字元，需要包含至少一個數字、一個大寫英文、一個小寫英文、一個特殊字元: !@#$%"
        required
      />

      <div className="login__control">
        <Button
          type="submit"
          text={isLoading ? 'spining' : '登入'}
          className="button"
          disabled={isLoading}
        />
        <Button
          type="button"
          text="註冊"
          variant={{ outline: true }}
          className="button"
          disabled={isLoading}
          onClick={() => navigate('/register')}
        />
      </div>
    </form>
  );
}
export default Login;
