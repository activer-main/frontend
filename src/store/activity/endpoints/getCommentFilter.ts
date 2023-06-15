import { activityBaseUrl, api } from '../../service';

const getCommentFilterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCommentfilterValue: builder.query<string[], void>({
      query: () => ({
        url: `${activityBaseUrl}commment/filterValue`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetCommentfilterValueQuery,
} = getCommentFilterApi;
