import { LocationType } from 'types/user';
import { userApi } from '../userService';

export const getLocationApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query<LocationType[], void>({
      query: () => ({
        url: 'locations',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetLocationsQuery, useLazyGetLocationsQuery } = getLocationApi;
