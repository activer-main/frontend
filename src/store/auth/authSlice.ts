import {
  createSlice, isAnyOf, PayloadAction,
} from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { RootState } from 'store';
import { LoginResponseType } from 'types/response';
import { UserDataType } from '../../types/user';
import { registerUser, userLogin, userUpdate } from './authAction';

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
    setCredentials: (state, action: PayloadAction<LoginResponseType>) => ({
      ...state,
      userInfo: action.payload.user,
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

    // post user data
      .addCase(userUpdate.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(userUpdate.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        userInfo: payload,
      }))
      .addCase(userUpdate.rejected, (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
      }))
      .addMatcher(isAnyOf(
        registerUser.rejected,
        userLogin.rejected,
      ), (state, { payload }) => {
        toast.error(payload as any);
        return ({
          ...state,
          loading: false,
          error: payload,
        });
      });
  },

});

export const { logout, setCredentials } = authSlice.actions;
export const selectUserData = (state: RootState) => state.auth;
export const selectUserInfo = (state: RootState) => state.auth.userInfo;

export default authSlice.reducer;
