import { TagDataType } from 'types/data';
import { activityApi } from '../activityService';

export interface ManageFilterValueResponseType {
  tags: TagDataType[];
  status: string[];
}

const getActivityFilter = activityApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useGetFilterValueQuery,
} = getActivityFilter;
