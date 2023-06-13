import _ from 'lodash';
import { activityApi } from '../activityService';

const deleteManageActivities = activityApi.injectEndpoints({
  endpoints: (builder) => ({
    // delete manage pags' activiies
    deleteManageActivity: builder.mutation<void, string[]>({
      query: (body) => ({
        url: 'activityStatus',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: (result, error, body) => _.concat([
        { type: 'Activity', id: 'List' }, // refetch getActivityApi.getActivities
        { type: 'Activity', id: 'Manage' }, // refetch getActivityApi.getManageActivities
        { type: 'Activity', id: 'Filter' },
      ], _.map(body, (id) => ({ type: 'Activity', id }))),
    }),

  }),
});

export const {
  useDeleteManageActivityMutation,
} = deleteManageActivities;
