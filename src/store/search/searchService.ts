import { TagDataType } from 'types/data';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { testURL } from 'utils/apiURL';
import { SearchRequestType } from 'types/request';
import { SearchResponseType } from 'types/response';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: URL.concat('/api/tag'),
    baseUrl: testURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('userToken');

      if (token) {
        // include token in req header
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Activity', 'Tag'],
  endpoints: (builder) => ({
    getSearchActivity: builder.query<SearchResponseType, SearchRequestType>({
      query: (request) => ({
        url: 'search',
        method: 'GET',
        params: request,
      }),
      providesTags: ['Activity'],
    }),
    getLocationTag: builder.query<TagDataType[], void>({
      query: () => ({
        url: 'location',
        method: 'GET',
      }),
      providesTags: ['Tag'],
    }),
    getFieldTag: builder.query<TagDataType[], void>({
      query: () => ({
        url: 'field',
        method: 'GET',
      }),
      providesTags: ['Tag'],
    }),
  }),

});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSearchActivityQuery,
  useGetFieldTagQuery,
  useGetLocationTagQuery,
} = searchApi;
