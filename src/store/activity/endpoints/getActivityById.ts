import { ActivityDataType } from 'types/data';
import { activityBaseUrl, api } from '../../service';

const getActivityById = api.injectEndpoints({
  endpoints: (builder) => ({
    // get activity by id
    getActivityById: builder.query<ActivityDataType, string>({
      query: (id) => ({
        url: `${activityBaseUrl}${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Activity', id }],
    }),

  }),
});

export const {
  useGetActivityByIdQuery,
} = getActivityById;
