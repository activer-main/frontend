import { ActivityDataType, TagDataType } from 'types/data';
import { SegmentRequestType, orderByUnion } from 'types/request';
import { SegmentResponseType } from 'types/response';
import { activityBaseUrl, api } from '../../service';

export interface SearchResponseType extends SegmentResponseType {
  keyword: string | null;
  tags: TagDataType[] | null;
  date: string | null;
  searchData: ActivityDataType[];
}

export interface SearchRequestType extends SegmentRequestType {
  keyword: string,
  tags?: string[],
  date?: string,
  orderBy?: orderByUnion,
}

export const searchApi = api.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query<SearchResponseType, SearchRequestType>({
      query: (request) => ({
        url: `${activityBaseUrl}search`,
        method: 'GET',
        params: request,
      }),
      providesTags: [{ type: 'Activity', id: 'List' }],
    }),

  }),
});

export const {
  useSearchQuery,
  useLazySearchQuery,
} = searchApi;
