import { api, userBaseUrl } from '../../service';

export type ForgetPasswrodRequest = {
  email: string
};

const forgetPasswordApi = api.injectEndpoints({
  endpoints: (builder) => ({
    forgetPassword: builder.query<void, ForgetPasswrodRequest>({
      query: (params) => ({
        url: `${userBaseUrl}resetPassword`,
        params,
      }),
    }),
  }),
});

export const { useLazyForgetPasswordQuery } = forgetPasswordApi;
