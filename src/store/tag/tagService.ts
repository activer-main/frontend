import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'utils/apiURL';
import { TagDataType } from 'types/data';

export const tagApi = createApi({
  reducerPath: 'tagApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL.concat('/api/tag'),
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
  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLocationTagQuery } = tagApi;
