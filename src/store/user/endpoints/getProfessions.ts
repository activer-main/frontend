import { ProfessionType } from 'types/user';
import { userApi } from '../userService';

export const getProfessionsApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfessions: builder.query<ProfessionType[], void>({
      query: () => ({
        url: 'professions',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetProfessionsQuery, useLazyGetProfessionsQuery } = getProfessionsApi;
