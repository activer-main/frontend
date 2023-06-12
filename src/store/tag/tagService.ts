import { createApi } from '@reduxjs/toolkit/query/react';
import { TagDataType } from 'types/data';
import customFetchBaseQuery from 'store/customFetchBaseQuery';
import { URL } from 'utils/apiURL';
import { TagsRequestType } from '../../types/request';

export const tagApi = createApi({
  reducerPath: 'tagApi',
  baseQuery: customFetchBaseQuery({ baseUrl: URL.concat('/api/tag') }),
  endpoints: (builder) => ({
    getTags: builder.query<TagDataType[], TagsRequestType>({
      query: (params) => ({
        url: '',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const {
  useGetTagsQuery,
  useLazyGetTagsQuery,
} = tagApi;
