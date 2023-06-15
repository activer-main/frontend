import { UserInfoType } from 'types/user';
import { userBaseUrl, api } from '../../service';

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

export const updataapi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<UserInfoType, UserUpdateRequestType>({
      query: (body) => ({
        url: `${userBaseUrl}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateUserMutation } = updataapi;
