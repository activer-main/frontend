import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { testURL } from 'utils/apiURL';
import { ActivityDataType, TagDataType } from 'types/data';
import { SearchRequestType } from 'types/request';

export const tagApi = createApi({
  reducerPath: 'tagApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: URL.concat('/api/tag'),
    baseUrl: testURL,
    prepareHeaders: (headers) => {
      // const token = (getState() as RootState).auth.userToken?.accessToken;

      const token = localStorage.getItem('userToken');

      if (token) {
        // include token in req header
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
    getFieldTag: builder.query<TagDataType[], void>({
      query: () => ({
        url: 'field',
        method: 'GET',
      }),
    }),
    getSearchActivity: builder.query<ActivityDataType[], SearchRequestType>({
      // eslint-disable-next-line
      query: (request) => ({
        url: 'search',
        method: 'GET',
        params: { id: 1 },
      }),
    }),
  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetLocationTagQuery,
  useGetSearchActivityQuery,
  useGetFieldTagQuery,
} = tagApi;
