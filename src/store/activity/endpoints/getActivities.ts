import { SegmentResponseType } from 'types/response';
import { SegmentRequestType, orderByUnion, sortByUnion } from 'types/request';
import { ActivityDataType } from 'types/data';
import { activityApi } from '../activityService';

export type ActivitiesRequestType = {
  tags?: string[];
  status?: string[] ;
  sortBy?: sortByUnion;
  orderBy?:orderByUnion;
} & SegmentRequestType;

export type ActivityResponseType = {
  searchData: ActivityDataType[] | null;
} & SegmentResponseType;

const getActivitiesApi = activityApi.injectEndpoints({
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

    // get recommend activities
    getRecommendActivity: builder.query<ActivityResponseType, ActivitiesRequestType>({
      query: (params) => ({
        url: 'recommend',
        method: 'GET',
        params,
      }),
      providesTags: [{ type: 'Activity', id: 'List' }, { type: 'Activity', id: 'Manage' }],
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

  }),
});

export const {
  useGetActivitiesQuery,
  useGetManageActivityQuery,
  useGetRecommendActivityQuery,
} = getActivitiesApi;
