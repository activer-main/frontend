import { UserInfoType } from 'types/user';
import { userApi } from '../userService';

export const tokenLoginApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    tokenLogin: builder.query<UserInfoType, void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const { useTokenLoginQuery } = tokenLoginApi;
