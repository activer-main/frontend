import { UserInfoType } from 'types/user';
import { api, userBaseUrl } from '../../service';

export const tokenLoginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    tokenLogin: builder.query<UserInfoType, void>({
      query: () => ({
        url: `${userBaseUrl}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const { useTokenLoginQuery } = tokenLoginApi;
