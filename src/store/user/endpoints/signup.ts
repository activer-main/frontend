import { api, userBaseUrl } from '../../service';
import { LoginResponse } from './login';

export type SignupRequest = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
};

export type SignupResponse = LoginResponse;

export const signupApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (body) => ({
        url: `${userBaseUrl}signup`,
        method: 'POST',
        body: {
          username: body.username,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const { useSignupMutation } = signupApi;
