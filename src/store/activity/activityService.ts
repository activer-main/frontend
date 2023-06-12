import { createApi } from '@reduxjs/toolkit/query/react';
import { ActivityDataType } from 'types/data';
import {
  ActivityCommentResponseType, ActivityResponseType,
  ManageFilterValueResponseType, SearchResponseType,
} from 'types/response';
import { ActivityStatusRequestType, ActivitiesRequestType, SearchRequestType } from 'types/request';
import _ from 'lodash';
import customFetchBaseQuery from 'store/customFetchBaseQuery';
import { URL } from 'utils/apiURL';
import { ActivityCommentPostRequestType, ActivityCommentRequestType } from '../../types/request';

export const activityApi = createApi({
  reducerPath: 'activityApi',
  baseQuery: customFetchBaseQuery({ baseUrl: URL.concat('/api/activity') }),
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
      invalidatesTags: (result, error, { id }) => [
        { type: 'Activity', id: 'Manage' },
        { type: 'Activity', id: 'List' },
        { type: 'Activity', id }],
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
    getSearchActivity: builder.query<SearchResponseType, SearchRequestType>({
      query: (request) => ({
        url: 'search',
        method: 'GET',
        params: request,
      }),
      providesTags: [{ type: 'Activity', id: 'List' }],
    }),
    getActivityComment: builder.query < ActivityCommentResponseType, ActivityCommentRequestType>({
      query: (params) => ({
        url: 'comment',
        method: 'GET',
        params,
      }),
      providesTags: [{ type: 'Activity', id: 'Comment' }],
    }),
    postActivityComment: builder.mutation<void, ActivityCommentPostRequestType>({
      query: (body) => ({
        url: 'comment',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Activity', id: 'Comment' }],
    }),
    deleteActivityComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `comment/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Activity', id: 'Comment' }],
    }),
    getCommentfilterValue: builder.query<string[], void>({
      query: () => ({
        url: 'commment/filterValue',
        method: 'GET',
      }),
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
  useGetSearchActivityQuery,
  useLazyGetSearchActivityQuery,
  useGetActivityCommentQuery,
  usePostActivityCommentMutation,
  useDeleteActivityCommentMutation,
  useGetCommentfilterValueQuery,
} = activityApi;
