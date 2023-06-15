import { LocationType } from 'types/user';
import { api, userBaseUrl } from '../../service';

export const getLocationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query<LocationType[], void>({
      query: () => ({
        url: `${userBaseUrl}locations`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetLocationsQuery, useLazyGetLocationsQuery } = getLocationApi;
