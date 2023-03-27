import {
  createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { LoginResponseType } from 'types/response';
import { UserDataType } from '../../types/user';

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
      userToken: action.payload.token,
    }),
  },
});

export const { logout, setCredentials } = authSlice.actions;
export const selectUserData = (state: RootState) => state.auth;
export const selectUserInfo = (state: RootState) => state.auth.userInfo;

export default authSlice.reducer;
