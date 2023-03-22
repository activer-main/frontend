import axios from 'axios';
import { LoginResponseType, RegisterResponseType } from 'types/response';
import { RegisterRequestType, LoginRequestType } from 'types/request';
import { UserInfoType } from 'types/user';
import { userToken } from '../store/auth/authSlice';

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
  '/signup',
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

export const putUserData = (newUserInfo : UserInfoType) => userResquest.put(
  '',
  newUserInfo,
  {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Barear ${userToken}`,
    },
  },
);
