import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'api/user';
import { ActivityDataType } from 'types/data';
import { userToken } from './authSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      // const token = (getState() as RootState).auth.userToken?.accessToken;

      const token = userToken;
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

  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetManageActivityQuery } = authApi;
