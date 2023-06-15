import { api, userBaseUrl } from '../../service';

type DeleteSearchHistoryRequest = {
  ids?: string[]
};

export const deleteSearchHistoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteSearchHistory: builder.mutation<void, DeleteSearchHistoryRequest >({
      query: (params) => ({
        url: `${userBaseUrl}search/history`,
        method: 'DELETE',
        params,
      }),
      invalidatesTags: ['SearchHistory'],
    }),
  }),
  overrideExisting: false,
});

export const { useDeleteSearchHistoryMutation } = deleteSearchHistoryApi;
