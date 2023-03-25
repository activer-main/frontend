import { userToken } from 'store/auth/authSlice';
import { LoginResponseType, RegisterResponseType } from 'types/response';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RegisterRequestType } from 'types/request';
import { LoginRequestType, VerifyRequestType, UserUpdateRequestType } from '../../types/request';
import { UserInfoType } from '../../types/user';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://220.132.244.41:5044/api/user',
    prepareHeaders: (headers) => {
      // const token = (getState() as RootState).auth.userToken?.accessToken;
      const token = userToken;

      if (token) {
        // include token in req header
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    // fetch user data by token
    getUserDetails: builder.query<LoginResponseType, undefined>({
      query: () => ({
        url: '/auth/token',
        method: 'GET',
      }),
    }),
    // verify
    userVerify: builder.mutation<UserInfoType, VerifyRequestType>({
      query: ({ verifyCode } : VerifyRequestType) => ({
        url: `/auth/verify/email?verifyCode=${verifyCode}`,
        method: 'GET',
      }),
    }),
    // update
    userUpdate: builder.mutation<void, UserUpdateRequestType>({
      query: (body) => (
        {
          url: '',
          method: 'PUT',
          body,
        }
      ),
    }),
    // login
    login: builder.mutation<LoginResponseType, LoginRequestType>({
      query: (body) => (
        {
          url: 'auth/signin',
          method: 'POST',
          body,
        }
      ),
    }),
    // register
    register: builder.mutation<
    RegisterResponseType,
    RegisterRequestType>({
      query: (body) => (
        {
          url: 'auth/signup',
          method: 'POST',
          body,
        }
      ),
    }),

  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserDetailsQuery,
  useUserVerifyMutation,
  useUserUpdateMutation,
  useLoginMutation,
  useRegisterMutation,
} = authApi;
