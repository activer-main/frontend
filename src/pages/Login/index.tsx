import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { userLogin } from 'store/auth/authAction';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import FormInput from 'components/FormInput';
import { LoginFormDataType } from 'types/user';
import './index.scss';
import { PASSWORD_PATTERN } from 'utils/pattern';

function Login() {
  const { loading, userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate(-1);
    }
  }, [navigate, userInfo]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & LoginFormDataType;
    dispatch(userLogin({
      email: target.email.value,
      password: target.password.value,
    }));
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
        id="email"
        required
      />

      <FormInput
        className="login__password"
        name="password"
        label="密碼"
        type="password"
        pattern={PASSWORD_PATTERN}
        title="密碼至少八位字元，需要包含至少一個數字、一個大寫英文、一個小寫英文、一個特殊字元: !@#$%"
        id="password"
        required
      />

      <div className="login__control">
        <Button
          type="submit"
          text={loading ? 'spining' : '登入'}
          className="button"
          disabled={loading}
        />
        <Button
          type="button"
          text="註冊"
          variant={{ outline: true }}
          className="button"
          disabled={loading}
          onClick={() => navigate('/register')}
        />

      </div>

    </form>
  );
}
export default Login;
