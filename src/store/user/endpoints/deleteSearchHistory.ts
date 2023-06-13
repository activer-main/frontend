import { userApi } from '../userService';

type DeleteSearchHistoryRequest = {
  ids?: string[]
};

export const deleteSearchHistoryApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteSearchHistory: builder.mutation<void, DeleteSearchHistoryRequest >({
      query: (params) => ({
        url: 'search/history',
        method: 'DELETE',
        params,
      }),
      invalidatesTags: ['SearchHistory'],
    }),
  }),
  overrideExisting: false,
});

export const { useDeleteSearchHistoryMutation } = deleteSearchHistoryApi;
