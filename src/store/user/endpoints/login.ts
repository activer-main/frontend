import { TokenType, UserInfoType } from 'types/user';
import { userApi } from '../userService';

export type LoginResponse = {
  user: UserInfoType;
  token:TokenType
};

export type LoginRequest = {
  email: string,
  password: string,
};

export const loginApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = loginApi;
