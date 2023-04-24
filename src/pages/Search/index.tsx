import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SearchIcon from '@mui/icons-material/Search';
import {
  CircularProgress,
  Container, Divider, LinearProgress, Skeleton, Stack,
} from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputAdornment from '@mui/material/InputAdornment';
import { MainCard } from 'components/Card';
import dayjs from 'dayjs';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  useGetSearchActivityQuery,
} from 'store/search/searchService';
import { useGetLocationTagQuery, useGetFieldTagQuery } from 'store/tag/tagService';
import { useAppDispatch, useAppSelector } from 'store';
import {
  removeAllByType, selectSearchState, setField, setLocation, setValue,
} from 'store/search/searchSlice';
import _ from 'lodash';
import { ActivityDataType } from 'types/data';
import TagManage from './TagManage';

const SlideTransition = React.forwardRef((
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

interface SearchResultType {
  isLoading: boolean;
  searchResultData?: ActivityDataType[]
}

function SearchResult({ isLoading, searchResultData }: SearchResultType) {
  if (isLoading) {
    return <LinearProgress />;
  }
  if (!searchResultData) {
    return <Typography variant="h4">查無資料</Typography>;
  }

  return (
    <>
      {
        searchResultData.map((activity) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={activity.id}>
            <MainCard isLoading={isLoading} {...activity} />
          </Grid>
        ))
      }
    </>
  );
}

function Search() {
  // hooks implementation
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchState = useAppSelector(selectSearchState);

  // search data by rtk query
  const { data: locationTagData } = useGetLocationTagQuery();
  const { data: fieldTagData } = useGetFieldTagQuery();
  const { data: searchData, isLoading } = useGetSearchActivityQuery({
    keyword: searchParams.get('keyword') || '',
    tags: searchParams.getAll('tags') || [],
    date: searchParams.get('date') || '',
    page: parseInt(searchParams.get('page') || '1', 10),
    per: 10,
  });

  // component @TagManage dialog display
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const newSearchParam = new URLSearchParams({
      keyword: searchState.keyword,
      tags: _.join(_.map(searchState.tags, 'text'), ','),
      date: searchState.date,
      page: searchState.page.toString(),
    });
    setSearchParams(newSearchParam);
  };

  return (
    <>
      {/* Search Control Form */}
      <Container component="form" sx={{ mt: 1, mb: 1 }} onSubmit={handleSubmit}>

        {/* Basic Search setting */}
        <Grid container spacing={3} alignItems="center">

          {/* Keyword */}
          <Grid item xs={12} md={7}>

            <TextField
              label="關鍵字"
              fullWidth
              name="keyword"
              value={searchState.keyword}
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setValue({ key: 'keyword', value: event.target.value }));
              }}
              InputProps={isLoading ? {
                startAdornment: (
                  <InputAdornment position="start">
                    <CircularProgress size={20} />
                  </InputAdornment>
                ),
              } : undefined}
            />

          </Grid>

          {/* Date */}
          <Grid item md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs(searchState.date, 'YYYY-MM-DD')}
                label="日期"
                onChange={(newValue: dayjs.Dayjs | null) => {
                  dispatch(setValue({ key: 'date', value: newValue?.format('YYYY-MM-DD') }));
                }}
              />
            </LocalizationProvider>
          </Grid>

          {/* Search Button */}
          <Grid item xs={2} md={1}>
            <Button
              color="primary"
              variant="contained"
              sx={{ width: '100%', minWidth: 'initial' }}
              type="submit"
            >
              <SearchIcon />
            </Button>
          </Grid>

        </Grid>

        <Divider sx={{ mt: 1 }} />
        {/* Filter */}
        <Grid container spacing={1} alignItems="center" sx={{ mt: 1, mb: 1 }}>

          {/* Location */}
          <Grid item xs={12} md={1}>
            <Typography variant="h5">
              地區
            </Typography>
          </Grid>
          <Grid item xs={12} md={11}>

            {!isLoading ? locationTagData?.map((tag) => (
              <FormControlLabel
                key={tag.id}
                componentsProps={{
                  typography: { variant: 'caption' },
                }}
                label={tag.text}
                checked={_.some(searchState.location, (stateTag) => _.isEqual(stateTag, tag))}
                control={<Checkbox />}
                onChange={() => dispatch(setLocation(tag))}
              />
            ))
              : (
                <Stack spacing={3} direction="row">
                  <Skeleton variant="rectangular" width={40} />
                  <Skeleton variant="rectangular" width={40} />
                  <Skeleton variant="rectangular" width={40} />
                  <Skeleton variant="rectangular" width={40} />
                </Stack>
              )}
            <Button onClick={() => dispatch(removeAllByType('location'))}>清除選擇</Button>
          </Grid>
          {/* Field */}
          <Grid item xs={12} md={1}>
            <Typography variant="h5">
              領域
            </Typography>
          </Grid>
          <Grid item xs={12} md={11}>
            {!isLoading ? fieldTagData?.map((tag) => (
              <FormControlLabel
                componentsProps={{
                  typography: { variant: 'caption' },
                }}
                checked={_.some(searchState.field, (stateTag) => _.isEqual(stateTag, tag))}
                key={tag.id}
                control={<Checkbox />}
                label={tag.text}
                onChange={() => dispatch(setField(tag))}
              />
            )) : (
              <Stack spacing={3} direction="row">
                <Skeleton variant="rectangular" width={40} />
                <Skeleton variant="rectangular" width={40} />
                <Skeleton variant="rectangular" width={40} />
                <Skeleton variant="rectangular" width={40} />
              </Stack>
            ) }
            <Button onClick={() => dispatch(removeAllByType('field'))}>清除選擇</Button>
          </Grid>
        </Grid>

        {/* Tag Manage */}
        <Button color="primary" onClick={handleOpen} startIcon={<ManageSearchIcon />}>
          標籤管理
        </Button>
        <Dialog
          open={open}
          fullScreen={fullScreen}
          TransitionComponent={fullScreen ? SlideTransition : undefined}
          onClose={handleClose}
          scroll="paper"
        >
          <TagManage onClose={handleClose} />
        </Dialog>

      </Container>

      {/* Result */}

      <Grid container spacing={3}>

        <SearchResult isLoading={isLoading} searchResultData={searchData?.searchResultData} />
      </Grid>

      {/* Pagination */}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignContent="center"
        marginTop={1}
      >
        <Pagination
          count={10}
          onChange={(event, number) => {
            setSearchParams((prevSearchParam) => {
              prevSearchParam.set('page', number.toString());
              return prevSearchParam;
            });
          }}
        />

      </Grid>
    </>
  );
}

export default Search;
