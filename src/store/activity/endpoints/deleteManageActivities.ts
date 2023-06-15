import _ from 'lodash';
import { activityBaseUrl, api } from '../../service';

const deleteManageActivities = api.injectEndpoints({
  endpoints: (builder) => ({
    // delete manage pags' activiies
    deleteManageActivity: builder.mutation<void, string[]>({
      query: (body) => ({
        url: `${activityBaseUrl}activityStatus`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: (result, error, body) => _.concat([
        { type: 'Activity', id: 'List' }, // refetch getapi.getActivities
        { type: 'Activity', id: 'Manage' }, // refetch getapi.getManageActivities
        { type: 'Activity', id: 'Filter' },
      ], _.map(body, (id) => ({ type: 'Activity', id }))),
    }),

  }),
});

export const {
  useDeleteManageActivityMutation,
} = deleteManageActivities;
