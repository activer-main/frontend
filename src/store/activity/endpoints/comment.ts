import { SegmentResponseType } from 'types/response';
import { CommentDataType } from 'types/data';
import { CommentSortbyUnion, SegmentRequestType, orderByUnion } from 'types/request';
import { activityApi } from '../activityService';

export interface ActivityCommentResponseType extends SegmentResponseType {
  activityId: string;
  searchData: CommentDataType[];
  userComment: CommentDataType | null;
}

export interface ActivityCommentRequestType extends SegmentRequestType {
  activityId: string;
  orderBy?: orderByUnion;
  sortBy?: CommentSortbyUnion
}

export interface ActivityCommentPostRequestType {
  activityId: string;
  rate: number;
  content: string;
}

const commentApi = activityApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivityComment: builder.query <ActivityCommentResponseType, ActivityCommentRequestType>({
      query: (params) => ({
        url: 'comment',
        method: 'GET',
        params,
      }),
      providesTags: [{ type: 'Activity', id: 'Comment' }],
    }),
    postActivityComment: builder.mutation<void, ActivityCommentPostRequestType>({
      query: (body) => ({
        url: 'comment',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Activity', id: 'Comment' }],
    }),
    deleteActivityComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `comment/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Activity', id: 'Comment' }],
    }),
  }),
});

export const {
  useDeleteActivityCommentMutation,
  useGetActivityCommentQuery,
  usePostActivityCommentMutation,
} = commentApi;
