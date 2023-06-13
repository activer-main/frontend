import React from 'react';
import dayjs from 'dayjs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import {
  removeAllByType,
  selectSearchState,
  setArea,
  setLocation,
  setValue,
} from 'store/search/searchSlice';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TransitionProps } from '@mui/material/transitions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useGetTagsQuery } from 'store/tag/tagService';
import {
  CircularProgress,
  Container,
  Divider,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Dialog,
  Pagination,
  Slide,
  Box,
  Stack,
} from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import { useSearchQuery } from 'store/activity/endpoints/search';
import TagManage from './TagManage';
import SearchResult from './components/SearchResult';
import SearchTagSelect from './components/SearchTagSelect';

const SlideTransition = React.forwardRef((
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

function Search() {
  // hooks implementation
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchState = useAppSelector(selectSearchState);
  const navigate = useNavigate();

  // search data by rtk query
  const { data: locationTagData, isLoading: isGettingLocationTag } = useGetTagsQuery({ type: ['location'] });
  const { data: areaTagData, isLoading: isGettingAreaTag } = useGetTagsQuery({ type: ['area'] });
  const {
    data: searchData, isLoading, isError, error,
  } = useSearchQuery({
    keyword: searchParams.get('keyword') || '',
    tags: searchParams.getAll('tags') || [],
    date: searchParams.get('date') || '',
    page: parseInt(searchParams.get('page') || '1', 10),
    countPerPage: 24,
  }, {
    skip: searchParams.toString() === '',
  });

  // component @TagManage dialog display
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = (event :React.SyntheticEvent) => {
    event.preventDefault();
    setSearchParams((prevSearchParam) => {
      prevSearchParam.delete('tags');
      searchState.tags.map((tag) => prevSearchParam.append('tags', tag.text));
      prevSearchParam.set('keyword', searchState.keyword);
      prevSearchParam.set('date', searchState.date);
      return prevSearchParam;
    });
  };

  React.useEffect(() => {
    if (isError) {
      toast.error((error as any).data.message);
    }
  }, [isError]);

  return (
    <Container maxWidth="xl">

      {/* Search Control Form */}
      <Box component="form" sx={{ mt: 1, mb: 1, pb: 1 }} onSubmit={handleSubmit}>

        {/* Basic Search setting */}
        <Grid container spacing={3} alignItems="center">

          {/* Keyword */}
          <Grid item xs={11} md={6}>

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
          <Grid item md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={searchState.date ? dayjs(searchState.date, 'YYYY-MM-DD') : null}
                label="日期"
                onChange={(newValue: dayjs.Dayjs | null) => {
                  dispatch(setValue({ key: 'date', value: newValue?.format('YYYY-MM-DD') }));
                }}
              />
            </LocalizationProvider>
          </Grid>

          {/* Search Button */}
          <Grid item xs>
            <Stack direction="row" spacing={1}>
              <Button
                color="primary"
                type="button"
                onClick={() => navigate('/user/history')}
              >
                <HistoryIcon />
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
              >
                <SearchIcon />
              </Button>
            </Stack>
          </Grid>

        </Grid>

        <Divider sx={{ mt: 1 }} />
        {/* Filter */}
        <Grid container spacing={1} alignItems="center" sx={{ mt: 1, mb: 1 }}>

          {/* Location */}
          <SearchTagSelect
            label="地區"
            isLoading={isGettingLocationTag}
            tagData={locationTagData}
            selectedTags={searchState.location}
            onChange={(tag) => dispatch(setLocation(tag))}
            onClear={() => dispatch(removeAllByType('location'))}
          />

          {/* Field */}
          <SearchTagSelect
            label="領域"
            isLoading={isGettingAreaTag}
            tagData={areaTagData}
            selectedTags={searchState.area}
            onChange={(tag) => dispatch(setArea(tag))}
            onClear={() => dispatch(removeAllByType('area'))}
          />
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
          maxWidth="lg"
          fullWidth
        >
          <TagManage onClose={handleClose} onSearch={(event) => handleSubmit(event)} />
        </Dialog>

      </Box>

      {/* Result */}

      <Grid container spacing={3}>
        <SearchResult isLoading={isLoading} searchResultData={searchData?.searchData} />
      </Grid>

      {/* Pagination */}
      {searchData
      && (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignContent="center"
          marginTop={1}
        >
          <Pagination
            count={searchData?.totalPage}
            onChange={(event, number) => {
              setSearchParams((prevSearchParam) => {
                prevSearchParam.set('page', number.toString());
                return prevSearchParam;
              });
            }}
          />
        </Grid>
      )}
    </Container>
  );
}

export default Search;
