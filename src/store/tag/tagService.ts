import { TagDataType } from 'types/data';
import { api, tagBaseUrl } from 'store/service';
import { TagsRequestType } from '../../types/request';

export const tagApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<TagDataType[], TagsRequestType>({
      query: (params) => ({
        url: `${tagBaseUrl}`,
        method: 'GET',
        params,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTagsQuery,
  useLazyGetTagsQuery,
} = tagApi;
