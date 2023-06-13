import { ActivityDataType } from 'types/data';
import { activityApi } from '../activityService';

const getActivityById = activityApi.injectEndpoints({
  endpoints: (builder) => ({
    // get activity by id
    getActivityById: builder.query<ActivityDataType, string>({
      query: (id) => ({
        url: `${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Activity', id }],
    }),

  }),
});

export const {
  useGetActivityByIdQuery,
} = getActivityById;
