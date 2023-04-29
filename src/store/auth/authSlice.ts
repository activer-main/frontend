import {
  createSlice, isAnyOf, PayloadAction,
} from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { RootState } from 'store';
import { LoginResponseType } from 'types/response';
import { UserDataType } from '../../types/user';
import { authApi } from './authService';
import {
  registerUser, userLogin, userUpdate, verifyUser,
} from './authAction';

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
};

const authSlice = createSlice({
  name: 'auth',
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
      });
    },
    setCredentials: (state, action: PayloadAction<LoginResponseType>) => ({
      ...state,
      userInfo: action.payload.user,
    }),
  },
  extraReducers: (builder) => {
    builder
      // Success: Register
      .addCase(registerUser.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        success: true,
        userToken: payload.token,
        userInfo: payload.user,
      }))
      // Success: update
      .addCase(userUpdate.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        userInfo: payload,
      }))

      // Success: verify
      .addCase(
        verifyUser.fulfilled,
        (state, { payload }) => {
          localStorage.setItem('userToken', payload.token.accessToken!);
          toast.success('驗證成功');
          return ({
            ...state,
            loading: false,
            success: true,
            userInfo: payload.user,
            userToken: payload.token,
          });
        },
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
            userToken: payload.token,
          });
        },
      )

      // Success: token login
      .addMatcher(
        authApi.endpoints.getAuthtoken.matchFulfilled,
        (state, { payload }) => ({
          ...state,
          userInfo: payload,
        }),
      )

      // Pending:
      .addMatcher(
        isAnyOf(
          registerUser.pending,
          userLogin.pending,
          verifyUser.pending,
          userUpdate.pending,
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
        userUpdate.rejected,
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
