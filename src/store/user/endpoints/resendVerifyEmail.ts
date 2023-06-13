import { userApi } from '../userService';

const resendVerifyEmailApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    resendVerifyEmail: builder.query({
      query: () => ({
        url: 'resendVerifyEmail',
      }),
    }),
  }),
});

export const { useLazyResendVerifyEmailQuery } = resendVerifyEmailApi;
