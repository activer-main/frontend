import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useGetFieldTagQuery, useGetLocationTagQuery, useGetSearchActivityQuery } from 'store/test/testService';
import {
  Button,
  Checkbox,
  FormControl, FormControlLabel,
  FormGroup, InputLabel,
  MenuItem, Modal, Pagination, Select, Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { MainCard } from 'components/Card';
import { useSearchParams } from 'react-router-dom';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { SearchRequestType } from 'types/request';
import SearchIcon from '@mui/icons-material/Search';
import TagManage from './TagManage';

function Search() {
  const currentDate = React.useMemo(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }, []);

  const searchParams = useSearchParams();
  const tags = searchParams[0].getAll('tags');
  const searchRequest: SearchRequestType = {
    keyword: searchParams[0].get('q') || '',
    tags: tags.length > 0 ? tags : [],
    currentSegment: parseInt(searchParams[0].get('currentSegment') || '1', 10),
    countPerSegment: parseInt(searchParams[0].get('countPerSegment') || '10', 10),
    date: new Date(searchParams[0].get('date') || currentDate),
  };

  const { data: locationTagData } = useGetLocationTagQuery();
  const { data: fieldTagData } = useGetFieldTagQuery();
  const { data: searchData } = useGetSearchActivityQuery(searchRequest);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Search Control Form */}
      <FormGroup sx={{ mt: 1, mb: 1 }}>
        <Grid container spacing={3} alignItems="center">

          {/* Keyword */}
          <Grid item xs={12} md={5}>
            <TextField label="關鍵字" fullWidth />
          </Grid>

          {/* Location */}
          <Grid item xs={4} md={3}>
            <FormControl fullWidth>
              <InputLabel>地點</InputLabel>
              <Select label="地點">
                {locationTagData?.map((tag) => (
                  <MenuItem value={tag.id}>{tag.text}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Date */}
          <Grid item xs={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={dayjs(currentDate)} label="日期" />
            </LocalizationProvider>
          </Grid>

          {/* Search Button */}
          <Grid item xs={2} md={1}>
            <Button
              color="primary"
              variant="contained"
              sx={{ width: '100%', minWidth: 'initial' }}
            >
              <SearchIcon />
            </Button>
          </Grid>

        </Grid>

        {/* field */}
        <Grid container spacing={1} alignItems="center" sx={{ mt: 1, mb: 1 }}>
          <Grid item xs={12} md={1}>
            <Typography variant="h5">
              領域
            </Typography>
          </Grid>
          <Grid item xs={12} md={11}>
            {fieldTagData?.map((tag) => (
              <FormControlLabel
                control={<Checkbox />}
                label={tag.text}
              />
            ))}
          </Grid>
        </Grid>

        {/* Tag Manage */}
        <Button color="primary" onClick={handleOpen} startIcon={<ManageSearchIcon />}>
          標籤管理
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <TagManage />
        </Modal>

      </FormGroup>

      {/* Result */}
      <Grid container spacing={3}>
        {searchData?.map((activity) => (
          <>
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <MainCard {...activity} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <MainCard {...activity} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <MainCard {...activity} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <MainCard {...activity} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <MainCard {...activity} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <MainCard {...activity} />
            </Grid>

          </>
        ))}
      </Grid>

      {/* Pagination */}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignContent="center"
        marginTop={1}
      >
        <Pagination count={10} />

      </Grid>
    </>
  );
}

export default Search;
