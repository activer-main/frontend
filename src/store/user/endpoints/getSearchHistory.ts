import { SearchHistoryDataType } from 'types/data';
import { SegmentResponseType } from 'types/response';
import { SegmentRequestType, orderByUnion } from 'types/request';
import { api, userBaseUrl } from '../../service';

type SearchHistoryResponse = {
  searchData: SearchHistoryDataType[]
} & Omit<SegmentResponseType, 'sortBy' >;

type SearchHistoryRequest = {
  orderBy?: orderByUnion;
} & SegmentRequestType;

export const getSearchHistoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSearchHistory: builder.query<SearchHistoryResponse, SearchHistoryRequest>({
      query: (params) => ({
        url: `${userBaseUrl}search/history`,
        method: 'GET',
        params,
      }),
      providesTags: ['SearchHistory'],
    }),

  }),
  overrideExisting: false,
});

export const { useGetSearchHistoryQuery } = getSearchHistoryApi;
