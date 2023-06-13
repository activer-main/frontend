import { activityApi } from '../activityService';

const getCommentFilterApi = activityApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommentfilterValue: builder.query<string[], void>({
      query: () => ({
        url: 'commment/filterValue',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetCommentfilterValueQuery,
} = getCommentFilterApi;
