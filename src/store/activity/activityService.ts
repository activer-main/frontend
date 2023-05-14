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
      providesTags: [{ type: 'Activity', id: 'List' }],
    }),
    getActivityById: builder.query<ActivityDataType, string>({
      query: (id) => ({
        url: `${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Activity', id }],
    }),
    postActivityStatus: builder.mutation<void, ActivityStatusRequestType>({
      query: (params) => ({
        url: 'activityStatus',
        method: 'POST',
        params,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Activity', id: 'Manage' }, { type: 'Activity', id: 'List' }, { type: 'Activity', id }],
    }),
    getManageActivity: builder.query <ActivityResponseType, ActivitiesRequestType>({
      query: (params) => ({
        url: 'manage',
        method: 'GET',
        params,
      }),
      providesTags: [{ type: 'Activity', id: 'Manage' }],
    }),
  }),
});

export const {
  useGetActivitiesQuery,
  useGetActivityByIdQuery,
  useGetManageActivityQuery,
  usePostActivityStatusMutation,
} = activityApi;
