import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'utils/apiURL';
import { TagDataType } from 'types/data';
import qs from 'qs';
import { TagsRequestType } from '../../types/request';

export const tagApi = createApi({
  reducerPath: 'tagApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL.concat('/api/tag'),
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('userToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  }),
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
} = tagApi;
