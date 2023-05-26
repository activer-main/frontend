import {
  Autocomplete,
  IconButton,
  Paper, TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { useLazyGetTagsQuery } from 'store/tag/tagService';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAppDispatch, useAppSelector } from 'store';
import { selectSearchState, setTags, setValue } from 'store/search/searchSlice';
import dayjs from 'dayjs';

function HeroSearch() {
  const searchState = useAppSelector(selectSearchState);
  const dispatch = useAppDispatch();

  const [getTag,
    {
      data: locationTagData,
      isLoading: isGettingLocationTag,
    }] = useLazyGetTagsQuery();

  return (
    <Paper
      sx={{
        borderRadius: '3em',
        height: '4em',
        width: 'fitContent',
        maxWidth: '70%',
        display: 'flex',
        gap: '1em',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
      }}
      elevation={10}
    >
      <TextField
        size="small"
        variant="standard"
        label="搜尋"
        onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
          dispatch(setValue({ key: 'keyword', value: event.target.value }));
        }}
      />

      <Autocomplete
        sx={{ width: '9em' }}
        options={locationTagData || []}
        getOptionLabel={(option) => option.text}
        loading={isGettingLocationTag}
        onOpen={() => getTag({
          type: ['location'],
        })}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="地點"
            variant="standard"
          />
        )}
        onChange={(event, value) => dispatch(setTags(value ? [value] : null))}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: '2' }}
          value={searchState.date ? dayjs(searchState.date, 'YYYY-MM-DD') : null}
          size=""
          label="日期"
          onChange={(newValue: dayjs.Dayjs | null) => {
            dispatch(setValue({ key: 'date', value: newValue?.format('YYYY-MM-DD') }));
          }}
        />
      </LocalizationProvider>

      <IconButton>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default HeroSearch;
