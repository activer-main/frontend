import { UserInfoType } from 'types/user';
import axios from 'axios';
import { LoginResponseType, RegisterResponseType } from 'types/response';
import {
  RegisterRequestType, LoginRequestType, UserUpdateRequestType, VerifyRequestType,
} from 'types/request';
import { URL } from 'utils/apiURL';

const authRequest = axios.create(
  {
    baseURL: URL.concat('/api/user'),
    headers: {
      'Access-Control-Allow-Origin': 'http://ck40292-everest.nord:5070',
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  },
);

// Register
export const postRegist = (
  registBody : RegisterRequestType,
) => authRequest.post<RegisterResponseType>(
  '/signup',
  registBody,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  },
);

// Login
export const postLogin = (loginBody: LoginRequestType) => authRequest.post<LoginResponseType>(
  '/login',
  loginBody,
  {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false,
  },
);

// Verify
export const getVerifyUser = ({ verifyCode } : VerifyRequestType) => authRequest.get<
LoginResponseType>(
  `verifyEmail?verifyCode=${verifyCode}`,
);

// Resend Verify
export const getResendVerifyEmail = () => authRequest.get<void>(
  'resendVerifyEmail',
);

export const patchUserData = (
  newUserInfo : UserUpdateRequestType,
) => authRequest.patch<UserInfoType>(
  '',
  newUserInfo,
);
