import { userApi } from '../userService';

export const updateAvatarApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation<void, FormData >({
      query: (body) => ({
        url: 'avatar',
        method: 'POST',
        body,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateAvatarMutation } = updateAvatarApi;
