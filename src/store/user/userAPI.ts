import { UserInfoType } from 'types/user';
import axios from 'axios';
import { LoginResponseType, RegisterResponseType } from 'types/response';
import {
  RegisterRequestType, LoginRequestType, UserUpdateRequestType, VerifyRequestType,
} from 'types/request';
import { URL } from 'utils/apiURL';

const userRequest = axios.create(
  {
    baseURL: URL.concat('/api/user'),
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  },
);

// Register
export const postRegist = (
  registBody : RegisterRequestType,
) => userRequest.post<RegisterResponseType>(
  '/signup',
  registBody,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  },
);

// Login
export const postLogin = (loginBody: LoginRequestType) => userRequest.post<LoginResponseType>(
  '/login',
  loginBody,
  {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false,
  },
);

// Verify
export const getVerifyUser = ({ verifyCode } : VerifyRequestType) => userRequest.get<
LoginResponseType>(
  `verifyEmail?verifyCode=${verifyCode}`,
);

// Resend Verify
export const getResendVerifyEmail = () => userRequest.get<void>(
  'resendVerifyEmail',
);

export const patchUserData = (
  newUserInfo : UserUpdateRequestType,
) => userRequest.patch<UserInfoType>(
  '',
  newUserInfo,
);
