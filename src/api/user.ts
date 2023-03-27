import { UserInfoType } from 'types/user';
import axios from 'axios';
import { LoginResponseType, RegisterResponseType } from 'types/response';
import { RegisterRequestType, LoginRequestType, UserUpdateRequestType } from 'types/request';
import { userToken } from 'store/auth/authSlice';

const IP = '220.132.244.41';
const PORT = '5044';

export const URL = `http://${IP}:${PORT}`;

const userResquest = axios.create(
  {
    baseURL: URL.concat('/api/user'),
  },
);

export const postRegist = (
  registBody : RegisterRequestType,
) => userResquest.post<RegisterResponseType>(
  '/auth/signup',
  registBody,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  },
);

export const postLogin = (loginBody: LoginRequestType) => userResquest.post<LoginResponseType>(
  '/auth/signin',
  loginBody,
  {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false,
  },
);

// eslint-disable-next-line
export const putUserData = (newUserInfo : UserUpdateRequestType) => userResquest.put<UserInfoType>(
  '',
  {
    RealName: 'John Doe',
    NickName: 'johndoe123',
    Avatar: 'https://example.com/avatar.png',
    Gender: 'male',
    Birthday: '1980-01-01T00:00:00.000Z',
    Profession: 'Software Developer',
    Phone: '123-456-7890',
    County: 'Los Angeles',
    Area: 'Santa Monica',
    ActivityHistory: ['activity1', 'activity2', 'activity3'],
    TagHistory: ['tag1', 'tag2', 'tag3'],
  },
  {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Barear ${userToken}`,
    },
  },
);
