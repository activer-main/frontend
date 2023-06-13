import { UserInfoType } from 'types/user';
import { userApi } from '../userService';

export type UserUpdateRequestType =
{
  username?: string | null;
  gender? : string | null;
  birthday?: string | null;
  professions? : string[] | null;
  phone?: string | null;
  county?: string | null;
  area?: string | null
};

export const updataUserApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<UserInfoType, UserUpdateRequestType>({
      query: (body) => ({
        url: '',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateUserMutation } = updataUserApi;
