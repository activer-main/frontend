import { UserInfoType } from 'types/user';
import { userApi } from '../userService';

export const authLoginApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    authLogin: builder.query<UserInfoType, void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const { useAuthLoginQuery } = authLoginApi;
