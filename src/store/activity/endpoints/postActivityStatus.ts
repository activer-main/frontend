import { ActivityDataType } from 'types/data';
import { activityApi } from '../activityService';

export type ActivityStatusRequestType = {
  id: ActivityDataType['id'];
  status: ActivityDataType['status']
};

const postActivityStatusApi = activityApi.injectEndpoints({
  endpoints: (builder) => ({
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

  }),
});

export const {
  usePostActivityStatusMutation,
} = postActivityStatusApi;
