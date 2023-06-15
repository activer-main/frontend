import { SegmentResponseType } from 'types/response';
import { SegmentRequestType, orderByUnion, sortByUnion } from 'types/request';
import { ActivityDataType } from 'types/data';
import { activityBaseUrl, api } from '../../service';

export type ActivitiesRequestType = {
  tags?: string[];
  status?: string[] ;
  sortBy?: sortByUnion;
  orderBy?:orderByUnion;
} & SegmentRequestType;

export type ActivityResponseType = {
  searchData: ActivityDataType[] | null;
} & SegmentResponseType;

const getActivitiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // get multiple activities
    getActivities: builder.query<ActivityResponseType, ActivitiesRequestType>({
      query: (params) => ({
        url: `${activityBaseUrl}`,
        method: 'GET',
        params,
      }),
      providesTags: [{ type: 'Activity', id: 'List' }],
    }),

    // get recommend activities
    getRecommendActivity: builder.query<ActivityResponseType, ActivitiesRequestType>({
      query: (params) => ({
        url: `${activityBaseUrl}recommend`,
        method: 'GET',
        params,
      }),
      providesTags: [{ type: 'Activity', id: 'List' }, { type: 'Activity', id: 'Manage' }],
    }),

    // get manange page's activities
    getManageActivity: builder.query <ActivityResponseType, ActivitiesRequestType>({
      query: (params) => ({
        url: `${activityBaseUrl}manage`,
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
