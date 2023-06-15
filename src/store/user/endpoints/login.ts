import { TokenType, UserInfoType } from 'types/user';
import { api, userBaseUrl } from '../../service';

export type LoginResponse = {
  user: UserInfoType;
  token:TokenType
};

export type LoginRequest = {
  email: string,
  password: string,
};

export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: `${userBaseUrl}login`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = loginApi;
