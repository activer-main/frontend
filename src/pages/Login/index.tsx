import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';
import { userLogin } from 'store/user/authAction';
import { LoginFormDataType } from 'types/user';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';

function Login() {
  const { loading, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<LoginFormDataType>();

  const onSubmit: SubmitHandler<LoginFormDataType> = (data) => {
    dispatch(userLogin(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p>{error}</p>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-input"
          {...register('email')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-input"
          {...register('password')}
          required
        />
      </div>
      <Button
        type="submit"
        text={loading ? 'spining' : 'Login'}
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
    </form>
  );
}
export default Login;
