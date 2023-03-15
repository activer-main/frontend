import {
  createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { UserDataType } from '../types/user';

const initialState: UserDataType = {
  id: 0,
  realName: '',
  nickName: '',
  email: '',
  verify: false,
  avatar: '',
  gender: '',
  birthday: '',
  profession: '',
  phone: '',
  county: '',
  area: '',
  activityHistory: [],
  tagHistory: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserDataType>) => ({
      ...state,
      ...action.payload,
    }),
    updateSingleUserData: (state, action: PayloadAction<Partial<UserDataType>>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const getUserData = (state: RootState) => state.user;

export const { updateUser, updateSingleUserData } = userSlice.actions;

export default userSlice.reducer;
