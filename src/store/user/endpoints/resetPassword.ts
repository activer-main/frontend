import { userApi } from '../userService';

type ResetPasswordRequestType = {
  email:string;
  token: string;
  password: string;
};
const resetPasswordApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.query<void, ResetPasswordRequestType>({
      query: (params) => ({
        url: 'verifyResetPassword',
        params,
      }),
    }),
  }),
});

export const { useLazyResetPasswordQuery } = resetPasswordApi;
