import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'utils/apiURL';
import { ActivityDataType } from 'types/data';
import { ActivityResponseType } from 'types/response';
import { ActivityStatusRequestType, ActivitiesRequestType } from 'types/request';

export const activityApi = createApi({
  reducerPath: 'activityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL.concat('/api/activity'),
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('userToken');
      if (token) {
        // include token in req header
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Activity'],
  endpoints: (builder) => ({
    getActivities: builder.query<ActivityResponseType, ActivitiesRequestType>({
      query: (params) => ({
        url: '',
        method: 'GET',
        params,
      }),
    }),
    getActivityById: builder.query<ActivityDataType, string>({
      query: (id) => ({
        url: `${id}`,
        method: 'GET',
      }),
      providesTags: ['Activity'],
    }),
    postActivityStatus: builder.mutation<void, ActivityStatusRequestType>({
      query: (params) => ({
        url: 'activityStatus',
        method: 'POST',
        params,
      }),
      invalidatesTags: ['Activity'],
    }),
    getManageActivity: builder.query <ActivityResponseType, ActivitiesRequestType>({
      query: (params) => ({
        url: 'manage',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const {
  useGetActivitiesQuery,
  useGetActivityByIdQuery,
  useGetManageActivityQuery,
  usePostActivityStatusMutation,
} = activityApi;
