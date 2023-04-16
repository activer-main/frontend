import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'utils/apiURL';
import { ActivityDataType } from 'types/data';
import { LoginResponseType } from 'types/response';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('userToken');
      if (token) {
        // include token in req header
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getManageActivity: builder.query<ActivityDataType[], void>({
      query: () => ({
        url: 'api/activity/dreamAndRegistered',
        method: 'GET',
      }),
    }),
    getAuthtoken: builder.query<LoginResponseType, void>({
      query: () => ({
        url: 'api/user/auth/token',
        method: 'GET',
      }),
    }),
  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetManageActivityQuery, useGetAuthtokenQuery } = authApi;
