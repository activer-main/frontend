import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'utils/apiURL';
import { TagDataType } from 'types/data';

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
  }),
  endpoints: (builder) => ({
    getLocationTag: builder.query<
    TagDataType[], void>({
      query: () => ({
        url: 'location',
        method: 'GET',
      }),
    }),
    getFieldTag: builder.query<
    TagDataType[], void>({
      query: () => ({
        url: 'field',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetLocationTagQuery,
  useGetFieldTagQuery,
} = tagApi;
