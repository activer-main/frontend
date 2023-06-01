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
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { format, parseISO } from 'date-fns';

function HeroSearch() {
  const searchState = useAppSelector(selectSearchState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/search?${qs.stringify({
      keyword: searchState.keyword,
      tags: searchState.tags.map((t) => t.text),
      date: format(parseISO(searchState.date), 'yyyy-MM-dd'),
    }, { arrayFormat: 'repeat' })}`);
  };

  const [getTag,
    {
      data: locationTagData,
      isLoading: isGettingLocationTag,
    }] = useLazyGetTagsQuery();

  return (
    <Paper
      sx={{
        borderRadius: '3em',
        height: '2.5em',
        maxWidth: '70%',
        display: 'flex',
        gap: '1em',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
      }}
      elevation={8}
      component="form"
    >
      <TextField
        size="small"
        variant="standard"
        label="搜尋"
        onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
          dispatch(setValue({ key: 'keyword', value: event.target.value }));
        }}
        onKeyDown={(event) => { if (event.key === 'Enter') { handleSubmit(); } }}
      />

      <Autocomplete
        sx={{ width: '10em' }}
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
          slotProps={{ textField: { variant: 'standard', size: 'small' } }}
          value={searchState.date ? dayjs(searchState.date, 'YYYY-MM-DD') : null}
          label="日期"
          onChange={(newValue: dayjs.Dayjs | null) => {
            dispatch(setValue({ key: 'date', value: newValue?.format('YYYY-MM-DD') }));
          }}
        />
      </LocalizationProvider>

      <IconButton onClick={handleSubmit}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default HeroSearch;
