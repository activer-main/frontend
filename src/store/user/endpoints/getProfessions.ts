import { ProfessionType } from 'types/user';
import { api, userBaseUrl } from '../../service';

export const getProfessionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfessions: builder.query<ProfessionType[], void>({
      query: () => ({
        url: `${userBaseUrl}professions`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetProfessionsQuery, useLazyGetProfessionsQuery } = getProfessionsApi;
