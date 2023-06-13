import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBaseQuery from 'store/customFetchBaseQuery';
import { URL } from 'utils/apiURL';

export const activityApi = createApi({
  reducerPath: 'activityApi',
  baseQuery: customFetchBaseQuery({ baseUrl: URL.concat('/api/activity') }),
  tagTypes: ['Activity'],
  endpoints: () => ({ }),
});
