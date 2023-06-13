import { userApi } from '../userService';
import { LoginResponse } from './login';

type VerifyReponse = LoginResponse;

type VerifyRequest = {
  verifyCode: string,
};

export const verifyApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    verify: builder.mutation<VerifyReponse, VerifyRequest>({
      query: (params) => ({
        url: 'verifyEmail',
        params,
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const { useVerifyMutation } = verifyApi;
