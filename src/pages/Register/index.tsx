// RegisterScreen.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';
import Button from 'components/Button';
import { registerUser } from
  'store/user/authAction';
import { RegisterFormDataType } from 'types/user';

function Register() {
  const {
    loading, error, userInfo, success,
  } = useAppSelector(
    (state) => state.user,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterFormDataType>();

  const onSubmit: SubmitHandler<RegisterFormDataType> = (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      alert('Password mismatch');
    }

    dispatch(registerUser({
      ...data,
      email: data.email.toLowerCase(),
      // transform email string to lowercase to avoid case sensitivity issues in login
    }));
  };

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate('/login');
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/user-profile');
  }, [navigate, userInfo, success]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p>{error}</p>}
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-input"
          {...register('username')}
          required
        />
      </div>
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
      <div className="form-group">
        <label htmlFor="email">Confirm Password</label>
        <input
          type="password"
          className="form-input"
          {...register('confirmPassword')}
          required
        />
      </div>
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

    </form>
  );
}
export default Register;
