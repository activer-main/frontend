import { api, userBaseUrl } from '../../service';
import { LoginResponse } from './login';

type VerifyReponse = LoginResponse;

type VerifyRequest = {
  verifyCode: string,
};

export const verifyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    verify: builder.mutation<VerifyReponse, VerifyRequest>({
      query: (params) => ({
        url: `${userBaseUrl}verifyEmail`,
        params,
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const { useVerifyMutation } = verifyApi;
