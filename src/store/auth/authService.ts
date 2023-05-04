import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'utils/apiURL';
import { UserInfoType } from 'types/user';
import { UserUpdateRequestType } from '../../types/request';

export const authApi = createApi({
  reducerPath: 'authApi',
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
  }),
  tagTypes: ['User'],
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
  }),
});

export const { useGetAuthtokenQuery, useUpdateUserMutation, useUpdateAvatarMutation } = authApi;
