import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from 'store';
import { selectUserInfo, setUserInfo } from 'store/user/userSlice';
import { CircularProgress } from '@mui/material';
import { useLazyGetProfessionsQuery } from 'store/user/endpoints/getProfessions';

export default function Profession() {
  const dispatch = useAppDispatch();
  const [getProfessionData, { data: professionData, isLoading }] = useLazyGetProfessionsQuery();
  const { professions: profession } = useAppSelector(selectUserInfo)!;
  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <Autocomplete
        filterSelectedOptions
        onOpen={() => {
          getProfessionData(undefined, true);
        }}
        loading={isLoading}
        multiple
        limitTags={3}
        options={professionData || []}
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
              label={option.profession}
              variant="outlined"
              {...getTagProps({ index })}
              key={`profession-option-${option.id}`}
            />
          ))
        }
        onChange={(e, value) => {
          dispatch(setUserInfo({ key: 'professions', value }));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
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

    </Stack>
  );
}
