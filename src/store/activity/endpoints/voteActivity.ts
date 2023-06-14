import { activityApi } from '../activityService';

export type VoteRequest = {
  id: string;
  userVote: number;
};

const voteActivityApi = activityApi.injectEndpoints({
  endpoints: (builder) => ({
    voteActivity: builder.mutation<void, VoteRequest>({
      query: (body) => ({
        url: `vote/${body.id}`,
        body: {
          userVote: body.userVote,
        },
        method: 'POST',
      }),
      invalidatesTags: (result, error, { id }) => ([{ type: 'Activity', id }]),
    }),

  }),
});

export const {
  useVoteActivityMutation,
} = voteActivityApi;
