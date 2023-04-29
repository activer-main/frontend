import { UserInfoType } from 'types/user';
import axios from 'axios';
import { LoginResponseType, RegisterResponseType } from 'types/response';
import {
  RegisterRequestType, LoginRequestType, UserUpdateRequestType, VerifyRequestType,
} from 'types/request';
import { userToken } from 'store/auth/authSlice';
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

// eslint-disable-next-line
export const putUserData = (newUserInfo : UserUpdateRequestType) => authRequest.put<UserInfoType>(
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
