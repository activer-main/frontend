import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'utils/apiURL';
import { ActivityDataType } from 'types/data';
import { SegmentRequestType } from 'types/request';
import { ActivityResponseType } from 'types/response';
import { ActivitiesRequestType } from '../../types/request';

export const activityApi = createApi({
  reducerPath: 'activityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL.concat('/api/activity'),
  }),
  endpoints: (builder) => ({
    getActivities: builder.query<ActivityResponseType, ActivitiesRequestType>({
      query: (request) => ({
        url: '',
        method: 'GET',
        params: request,
      }),
    }),
    getActivity: builder.query<ActivityDataType, string>({
      query: (id) => ({
        url: `${id}`,
        method: 'GET',
      }),
    }),
    getTrendActivity: builder.query<ActivityResponseType, SegmentRequestType>({
      query: (request) => ({
        url: 'trend',
        method: 'POST',
        body: { request },
      }),
    }),
    getNewestActivity: builder.query<ActivityResponseType, SegmentRequestType>({
      query: (body) => ({
        url: 'newest',
        method: 'POST',
        body,
      }),
    }),

  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetActivitiesQuery,
  useGetActivityQuery,
  useGetTrendActivityQuery,
  useGetNewestActivityQuery,
} = activityApi;
