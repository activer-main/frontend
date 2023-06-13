import React, { useState } from 'react';
import {
  Autocomplete,
  CircularProgress,
  Grid,
  TextField,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store';
import { selectUserInfo, setUserInfo } from 'store/user/userSlice';
import { LocationType } from 'types/user';
import { useLazyGetLocationsQuery } from 'store/user/endpoints/getLocations';

function Location() {
  const { county, area } = useAppSelector(selectUserInfo)!;
  const [getLocationData, { data: locationData, isLoading }] = useLazyGetLocationsQuery();

  const [currentCounty, setCurrentCounty] = useState<string | null>(county);
  const dispatch = useAppDispatch();

  const handleChangeCounty = (value: string | null) => {
    dispatch(setUserInfo({ key: 'county', value }));
    dispatch(setUserInfo({ key: 'area', value: null }));
    setCurrentCounty(value);
  };

  const handleChangeArea = (value: string | null) => {
    dispatch(setUserInfo({ key: 'area', value }));
  };

  return (
    <Grid container spacing={2} direction="row">

      <Grid item xs={6}>
        {/* Country */}
        <Autocomplete
          onOpen={() => {
            getLocationData(undefined, true);
          }}
          loading={isLoading}
          options={locationData?.map((l: LocationType) => l.cityName) || []}
          value={county || ''}
          onChange={(event, value) => handleChangeCounty(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="縣市"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Autocomplete
          onOpen={() => {
            getLocationData(undefined, true);
          }}
          loading={isLoading}
          options={locationData?.find(
            (c) => c.cityName === currentCounty,
          )?.areas.map((a) => a.areaName) || []}
          value={area || ''}
          onChange={(event, value) => handleChangeArea(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="區鄉鎮"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}

export default Location;
