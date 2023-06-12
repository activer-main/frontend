import { UserInfoType } from 'types/user';
import axios from 'axios';
import { LoginResponseType, RegisterResponseType } from 'types/response';
import {
  RegisterRequestType, LoginRequestType,
  UserUpdateRequestType, VerifyRequestType, ResetPasswordRequestType,
} from 'types/request';
import { URL } from 'utils/apiURL';

const userRequest = axios.create(
  {
    baseURL: URL.concat('/api/user'),
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
    transformResponse: [
      (data) => {
        let response;

        try {
          response = JSON.parse(data);
        } catch (error) {
          throw Error(`[requestClient] Error parsing response JSON data - ${JSON.stringify(error)}`);
        }

        if (response.Success) {
          return response.Data;
        }
        return {
          statusCode: response.StatusCode,
          message: response.Message,
          error: response.Error,
        };
      },
    ],
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

export const forgetPassword = (email: string) => userRequest.get<void>(
  `resetPassword?email=${email}`,
);

export const resetPassword = (params: ResetPasswordRequestType) => userRequest.get<void>(
  `verifyResetPassword?${new URLSearchParams(params).toString()}`,
);
