import { UserInfoType } from 'types/user';
import { LoginResponseType, RegisterResponseType } from 'types/response';
import { postRegist, postLogin, putUserData } from 'api/user';
import { RegisterRequestType } from 'types/request';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserUpdateRequestType, LoginRequestType } from '../../types/request';

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
    // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
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
      // store user's token in local storage
      localStorage.setItem('userToken', data.token.accessToken);
      return data;
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
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
      const { data } = await putUserData(newUserData);
      return data;
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  },
);
