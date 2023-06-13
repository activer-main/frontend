import { SearchHistoryDataType } from 'types/data';
import { SegmentResponseType } from 'types/response';
import { SegmentRequestType, orderByUnion } from 'types/request';
import { userApi } from '../userService';

type SearchHistoryResponse = {
  searchData: SearchHistoryDataType[]
} & Omit<SegmentResponseType, 'sortBy' >;

type SearchHistoryRequest = {
  orderBy: orderByUnion;
} & SegmentRequestType;

export const getSearchHistoryApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchHistory: builder.query<SearchHistoryResponse, SearchHistoryRequest>({
      query: (params) => ({
        url: 'search/history',
        method: 'GET',
        params,
      }),
      providesTags: ['SearchHistory'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetSearchHistoryQuery } = getSearchHistoryApi;
