import { userApi } from '../userService';

export type ForgetPasswrodRequest = {
  email: string
};

const forgetPasswordApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    forgetPassword: builder.query<void, ForgetPasswrodRequest>({
      query: (params) => ({
        url: 'resetPassword',
        params,
      }),
    }),
  }),
});

export const { useLazyForgetPasswordQuery } = forgetPasswordApi;
