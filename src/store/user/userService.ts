import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'utils/apiURL';
import { UserInfoType, ProfessionType, LocationType } from 'types/user';
import { SearchHistoryResponseType } from 'types/response';
import qs from 'qs';
import { UserUpdateRequestType, SearchHistoryRequestType } from '../../types/request';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL.concat('/api/user'),
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('userToken');
      if (token) {
        // include token in req header
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  }),
  tagTypes: ['User', 'SearchHistory'],
  endpoints: (builder) => ({

    // token login
    getAuthtoken: builder.query<UserInfoType, void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<UserInfoType, UserUpdateRequestType>({
      query: (body) => ({
        url: '',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    updateAvatar: builder.mutation<void, FormData >({
      query: (body) => ({
        url: 'avatar',
        method: 'POST',
        body,
        responseHandler: (response) => response.text(),
      }),
    }),
    getProfessions: builder.query<ProfessionType[], void>({
      query: () => ({
        url: 'professions',
        method: 'GET',
      }),
    }),
    getLocations: builder.query<LocationType[], void>({
      query: () => ({
        url: 'locations',
        method: 'GET',
      }),
    }),
    getSearchHistory: builder.query<SearchHistoryResponseType, SearchHistoryRequestType>({
      query: (params) => ({
        url: 'search/history',
        method: 'GET',
        params,
      }),
      providesTags: ['SearchHistory'],
    }),
    deletSearchHistory: builder.mutation<void, { ids: string[] }>({
      query: (params) => ({
        url: 'search/history',
        method: 'DELETE',
        params,
      }),
      invalidatesTags: ['SearchHistory'],
    }),
  }),
});

export const {
  useGetAuthtokenQuery,
  useUpdateUserMutation,
  useUpdateAvatarMutation,
  useLazyGetLocationsQuery,
  useLazyGetProfessionsQuery,
  useGetSearchHistoryQuery,
  useDeletSearchHistoryMutation,
} = userApi;
