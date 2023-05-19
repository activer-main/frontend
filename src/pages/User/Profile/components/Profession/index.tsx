import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from 'store';
import { selectUserInfo, setUserInfo } from 'store/user/userSlice';
import { useGetProfessionsQuery } from 'store/user/userService';
import { Skeleton } from '@mui/material';

export default function Profession() {
  const dispatch = useAppDispatch();
  const { data: professionData, isLoading } = useGetProfessionsQuery();
  const { profession } = useAppSelector(selectUserInfo)!;
  return (
    <Stack spacing={3} sx={{ width: '100%' }}>

      {(!professionData || isLoading) && (
        <Skeleton>
          <Autocomplete
            multiple
            limitTags={3}
            renderInput={(params) => <TextField {...params} />}
            options={[]}
            value={[]}
          />
        </Skeleton>
      )}
      {professionData
      && (
        <Autocomplete
          multiple
          limitTags={3}
          options={professionData}
          getOptionLabel={(option) => option.profession}
          value={profession || []}
          renderTags={
            (
              value,
              getTagProps,
            ) => value.map((
              option,
              index: number,
            ) => (
              <Chip
                variant="outlined"
                label={option.profession}
                {...getTagProps({ index })}
              />
            ))
          }
          onChange={(e, value) => {
            console.log(value);
            dispatch(setUserInfo({ key: 'profession', value }));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="test"
            />
          )}
        />
      )}

    </Stack>
  );
}
