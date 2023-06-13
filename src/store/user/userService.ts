import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBaseQuery from 'store/customFetchBaseQuery';
import { URL } from 'utils/apiURL';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customFetchBaseQuery({ baseUrl: URL.concat('/api/user') }),
  tagTypes: ['User', 'SearchHistory'],
  endpoints: () => ({}),
});
