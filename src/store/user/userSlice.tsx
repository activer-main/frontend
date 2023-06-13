import {
  createSlice, isAnyOf, PayloadAction,
} from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import type { RootState } from 'store';
import { UserDataType, UserInfoType } from '../../types/user';
import { UserUpdateRequestType } from './endpoints/updateUser';
import { tokenLoginApi } from './endpoints/tokenLogin';
import { loginApi } from './endpoints/login';
import { signupApi } from './endpoints/signup';

// initialize userToken from local storage
export const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const initialState: UserDataType = {
  loading: false,
  userInfo: undefined, // for user object
  userToken: undefined, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
  changed: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => {
      redirect('/login');
      localStorage.removeItem('userToken');
      // deletes token from storage
      return ({
        success: true,
        loading: false,
        userInfo: undefined,
        userToken: undefined,
        error: null,
        changed: false,
      });
    },
    setUserInfo: (state, action: PayloadAction<{
      key: keyof UserInfoType,
      value:any
    }>) => {
      const { key, value } = action.payload;
      return {
        ...state,
        changed: true,
        userInfo: {
          ...state.userInfo!,
          [key]: value,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder

    // set token for login and signup
      .addMatcher(isAnyOf(
        signupApi.endpoints.signup.matchFulfilled,
        loginApi.endpoints.login.matchFulfilled,
      ), (state, { payload }) => {
        localStorage.setItem('userToken', payload.token.accessToken!);
        return state;
      })

    // Success: token login
      .addMatcher(
        tokenLoginApi.endpoints.tokenLogin.matchFulfilled,
        (state, { payload }) => ({
          ...state,
          userInfo: payload,
          changed: false,
        }),
      );
  },
});

export const { logout, setUserInfo } = userSlice.actions;
export const selectUserData = (state: RootState) => state.user;
export const selectUserInfo = (state: RootState) => state.user.userInfo;
export const selectUpdateUserInfo = (state: RootState): UserUpdateRequestType => ({
  username: state.user.userInfo?.username,
  gender: state.user.userInfo?.gender,
  professions: state.user.userInfo?.professions?.map((p) => p.profession),
  birthday: state.user.userInfo?.birthday,
  phone: state.user.userInfo?.phone,
  county: state.user.userInfo?.county,
  area: state.user.userInfo?.area,
});

export default userSlice.reducer;
