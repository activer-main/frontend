import {
  createSlice,
} from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { UserDataType } from '../../types/user';
import { registerUser, userLogin } from './authAction';

const initialState: UserDataType = {
  loading: false,
  userInfo: null, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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

export const getUserData = (state: RootState) => state.user;

export default userSlice.reducer;
