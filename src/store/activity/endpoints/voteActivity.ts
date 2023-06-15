import { activityBaseUrl, api } from '../../service';

export type VoteRequest = {
  id: string;
  userVote: number;
};

const voteapi = api.injectEndpoints({
  endpoints: (builder) => ({
    voteActivity: builder.mutation<void, VoteRequest>({
      query: (body) => ({
        url: `${activityBaseUrl}vote/${body.id}`,
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
} = voteapi;
