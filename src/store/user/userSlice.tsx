import {
  createSlice, isAnyOf, PayloadAction,
} from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { RootState } from 'store';
import { LoginResponseType } from 'types/response';
import { UserDataType, UserInfoType } from '../../types/user';
import {
  registerUser, userLogin, verifyUser,
} from './userAction';
import { authLoginApi } from './endpoints/authLogin';
import { UserUpdateRequestType } from './endpoints/updateUser';

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
    setCredentials: (state, action: PayloadAction<LoginResponseType>) => ({
      ...state,
      userInfo: action.payload.user,
    }),
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

      // Success: Register
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        localStorage.setItem('userToken', payload.token.accessToken!);
        toast.success('註冊成功');
        return ({
          ...state,
          loading: false,
          success: true,
          userToken: payload.token,
          userInfo: payload.user,
        });
      })

      // Success: verify
      .addCase(
        verifyUser.fulfilled,
        (state, { payload }) => ({
          ...state,
          loading: false,
          success: true,
          userInfo: payload.user,
          userToken: payload.token,
        }),
      )

    // Success: login
      .addCase(
        userLogin.fulfilled,
        (state, { payload }) => {
          localStorage.setItem('userToken', payload.token.accessToken!);
          return ({
            ...state,
            loading: false,
            userInfo: payload.user,
            changed: false,
            userToken: payload.token,
          });
        }
        ,
      )

    // Success: token login
      .addMatcher(
        authLoginApi.endpoints.authLogin.matchFulfilled,
        (state, { payload }) => ({
          ...state,
          userInfo: payload,
          changed: false,
        }),
      )

      // Pending:
      .addMatcher(
        isAnyOf(
          registerUser.pending,
          userLogin.pending,
          verifyUser.pending,
        ),
        (state) => ({
          ...state,
          loading: true,
          error: null,
        }),
      )

      // reject
      .addMatcher(isAnyOf(
        registerUser.rejected,
        userLogin.rejected,
        verifyUser.rejected,
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

export const { logout, setCredentials, setUserInfo } = userSlice.actions;
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
