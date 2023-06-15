import { TagDataType } from 'types/data';
import { activityBaseUrl, api } from '../../service';

export interface ManageFilterValueResponseType {
  tags: TagDataType[];
  status: string[];
}

const getActivityFilter = api.injectEndpoints({
  endpoints: (builder) => ({
    // get manage page's filter
    getFilterValue: builder.query<ManageFilterValueResponseType, void>({
      query: () => ({
        url: `${activityBaseUrl}activityFilterValue`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Activity', id: 'Filter' }],
    }),
  }),
});

export const {
  useGetFilterValueQuery,
} = getActivityFilter;
