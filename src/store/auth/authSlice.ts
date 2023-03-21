import {
  createSlice,
} from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import type { RootState } from 'store';
import { UserDataType } from '../../types/user';
import { registerUser, userLogin } from './authAction';

// initialize userToken from local storage
export const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const initialState: UserDataType = {
  loading: false,
  userInfo: null, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      redirect('/login');
      localStorage.removeItem('userToken');
      // deletes token from storage
      return ({
        ...state,
        loading: false,
        userInfo: null,
        userToken: null,
        error: null,
      });
    },
    setCredentials: (state, { payload }) => ({
      ...state,
      userInfo: payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      // regist
      .addCase(registerUser.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(registerUser.fulfilled, (state) => ({
        ...state,
        loading: false,
        success: true,
      }))
      .addCase(registerUser.rejected, (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
      }))
      // login
      .addCase(userLogin.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(userLogin.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        userInfo: payload.user,
        userToken: payload.token,
      }))
      .addCase(userLogin.rejected, (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
      }));
  },

});

export const { logout, setCredentials } = authSlice.actions;
export const selectUserData = (state: RootState) => state.auth;
export const selectUserInfo = (state: RootState) => state.auth.userInfo;

export default authSlice.reducer;
