import { api, userBaseUrl } from '../../service';

type ResetPasswordRequestType = {
  email:string;
  token: string;
  password: string;
};
const resetPasswordApi = api.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.query<void, ResetPasswordRequestType>({
      query: (params) => ({
        url: `${userBaseUrl}verifyResetPassword`,
        params,
      }),
    }),
  }),
});

export const { useLazyResetPasswordQuery } = resetPasswordApi;
