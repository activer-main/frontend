import { api, userBaseUrl } from '../../service';

const resendVerifyEmailApi = api.injectEndpoints({
  endpoints: (builder) => ({
    resendVerifyEmail: builder.query({
      query: () => ({
        url: `${userBaseUrl}resendVerifyEmail`,
      }),
    }),
  }),
});

export const { useLazyResendVerifyEmailQuery } = resendVerifyEmailApi;
