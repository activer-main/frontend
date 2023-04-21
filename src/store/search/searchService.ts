import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SearchRequestType } from 'types/request';
import { SearchResponseType } from 'types/response';
import { URL } from 'utils/apiURL';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL.concat('/api/search'),
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
        url: '',
        method: 'GET',
        params: request,
      }),
      providesTags: ['Activity'],
    }),
  }),

});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSearchActivityQuery,
} = searchApi;
