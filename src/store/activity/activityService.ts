import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'utils/apiURL';
import { ActivityDataType } from 'types/data';
import { SegmentRequestType } from 'types/request';
import { ActivityResponseType } from 'types/response';

export const activityApi = createApi({
  reducerPath: 'activityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),
  endpoints: (builder) => ({
    getActivity: builder.query<ActivityDataType, string>({
      query: (id) => ({
        url: `api/activity/${id}`,
        method: 'GET',
      }),
    }),
    getTrendActivity: builder.query<ActivityResponseType, SegmentRequestType>({
      query: (request) => ({
        url: 'api/activity/trend',
        method: 'POST',
        body: { request },
      }),
    }),
    getNewestActivity: builder.query<ActivityResponseType, SegmentRequestType>({
      query: (body) => ({
        url: 'api/activity/newest',
        method: 'POST',
        body,
      }),
    }),

  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetActivityQuery,
  useGetTrendActivityQuery,
  useGetNewestActivityQuery,
} = activityApi;
