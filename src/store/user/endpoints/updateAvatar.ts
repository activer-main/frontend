import { api, userBaseUrl } from '../../service';

export const updateAvatarApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation<void, FormData >({
      query: (body) => ({
        url: `${userBaseUrl}avatar`,
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
