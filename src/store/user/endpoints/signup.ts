import { userApi } from '../userService';
import { LoginResponse } from './login';

export type SignupRequest = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
};

export type SignupResponse = LoginResponse;

export const signupApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (body) => ({
        url: 'signup',
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
