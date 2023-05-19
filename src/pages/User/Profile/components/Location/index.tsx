import React, { useState } from 'react';
import {
  FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Skeleton,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetLocationsQuery } from 'store/user/userService';
import { selectUserInfo, setUserInfo } from 'store/user/userSlice';

function Location() {
  const { county, area } = useAppSelector(selectUserInfo)!;
  const { data: locationData } = useGetLocationsQuery();

  const [currentCounty, setCurrentCounty] = useState<string | null>(county);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!county && locationData) {
      setCurrentCounty('');
    }
  }, [county]);

  const handleChangeCounty = (e: SelectChangeEvent<string>) => {
    dispatch(setUserInfo({ key: 'county', value: e.target.value }));
    setCurrentCounty(e.target.value);
  };

  const handleChangeArea = (e: SelectChangeEvent<string>) => {
    dispatch(setUserInfo({ key: 'area', value: e.target.value }));
  };

  return (
    <>
      {/* Country */}
      <FormControl sx={{ width: '100%' }}>
        <InputLabel>縣市</InputLabel>
        <Select
          fullWidth
          label="縣市"
          name="county"
          onChange={handleChangeCounty}
          value={currentCounty ?? ''}
        >
          <MenuItem value="">未選擇</MenuItem>
          {locationData ? locationData.map((c) => (
            <MenuItem value={c.cityName} key={c.cityName}>{c.cityName}</MenuItem>
          )) : (
            <Skeleton>
              <MenuItem />
            </Skeleton>
          )}

        </Select>
      </FormControl>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel>區鄉鎮</InputLabel>
        <Select
          label="區鄉鎮"
          name="area"
          value={area ?? ''}
          onChange={handleChangeArea}
        >
          <MenuItem value={undefined}>未選擇</MenuItem>
          {
            locationData ? locationData.find(
              (c) => c.cityName === currentCounty,
            )?.areas.map((a) => (
              <MenuItem value={a.areaName} key={a.areaName}>
                { a.areaName}
              </MenuItem>
            ))
              : (
                <Skeleton>
                  <MenuItem />
                </Skeleton>
              )
          }

        </Select>
      </FormControl>
    </>
  );
}

export default Location;
