import { UserInfoType } from 'types/user';
import { LoginResponseType, RegisterResponseType } from 'types/response';
import { RegisterRequestType } from 'types/request';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  VerifyRequestType, UserUpdateRequestType, LoginRequestType,
} from '../../types/request';
import {
  getVerifyUser, postLogin, postRegist, patchUserData,
} from './userAPI';

// Register
export const registerUser = createAsyncThunk<
RegisterResponseType,
RegisterRequestType
>(
  'auth/register',
  async (registBody: RegisterRequestType, { rejectWithValue }) => {
    try {
      const { data } = await postRegist(registBody);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Login
export const userLogin = createAsyncThunk<
LoginResponseType,
LoginRequestType
>(
  'auth/login',
  async (loginBody: LoginRequestType, { rejectWithValue }) => {
    try {
      const { data } = await postLogin(loginBody);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

// update
export const userUpdate = createAsyncThunk<
UserInfoType,
UserUpdateRequestType
>(
  'auth/update',
  async (newUserData: UserUpdateRequestType, { rejectWithValue }) => {
    try {
      const { data } = await patchUserData(newUserData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const verifyUser = createAsyncThunk<
LoginResponseType,
VerifyRequestType>(
  'auth/verify',
  async (request: VerifyRequestType, { rejectWithValue }) => {
    try {
      const { data } = await getVerifyUser(request);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
