import qs from 'qs';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'utils/apiURL';
import { ActivityDataType } from 'types/data';
import { ActivityResponseType, ManageFilterValueResponseType } from 'types/response';
import { ActivityStatusRequestType, ActivitiesRequestType } from 'types/request';
import _ from 'lodash';

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
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  }),
  tagTypes: ['Activity'],
  endpoints: (builder) => ({

    // get multiple activities
    getActivities: builder.query<ActivityResponseType, ActivitiesRequestType>({
      query: (params) => ({
        url: '',
        method: 'GET',
        params,
      }),
      providesTags: [{ type: 'Activity', id: 'List' }],
    }),

    // get activity by id
    getActivityById: builder.query<ActivityDataType, string>({
      query: (id) => ({
        url: `${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Activity', id }],
    }),

    // update activitiy's status
    postActivityStatus: builder.mutation<void, ActivityStatusRequestType>({
      query: (params) => ({
        url: 'activityStatus',
        method: 'POST',
        params,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Activity', id: 'Manage' }, { type: 'Activity', id: 'List' }, { type: 'Activity', id }],
    }),

    // get manange page's activities
    getManageActivity: builder.query <ActivityResponseType, ActivitiesRequestType>({
      query: (params) => ({
        url: 'manage',
        method: 'GET',
        params,
      }),
      providesTags: [{ type: 'Activity', id: 'Manage' }],
    }),

    // delete manage pags' activiies
    deleteManageActivity: builder.mutation<void, string[]>({
      query: (body) => ({
        url: 'activityStatus',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: (result, error, body) => _.concat([
        { type: 'Activity', id: 'List' },
        { type: 'Activity', id: 'Manage' },
        { type: 'Activity', id: 'Filter' },
      ], _.map(body, (id) => ({ type: 'Activity', id }))),
    }),

    // get manage page's filter
    getFilterValue: builder.query<ManageFilterValueResponseType, void>({
      query: () => ({
        url: 'activityFilterValue',
        method: 'GET',
      }),
      providesTags: [{ type: 'Activity', id: 'Filter' }],
    }),

  }),
});

export const {
  useGetActivitiesQuery,
  useGetActivityByIdQuery,
  useGetManageActivityQuery,
  usePostActivityStatusMutation,
  useDeleteManageActivityMutation,
  useGetFilterValueQuery,
} = activityApi;
