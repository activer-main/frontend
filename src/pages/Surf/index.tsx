import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  Box,
  Button, ButtonGroup, Grid, Pagination,
} from '@mui/material';
import { useGetActivitiesQuery } from 'store/activity/activityService';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { LoaderFunction, redirect, useSearchParams } from 'react-router-dom';
import { MainCard } from 'components/Card';
import { sortByUnion, orderByUnion } from 'types/request';

export const surfLoader: LoaderFunction = ({ request }) => {
  const { searchParams } = new URL(request.url);
  const sorting = searchParams.get('sorting');
  const sortBy = searchParams.get('sortby');

  // search param check
  if (!sorting || !Object.values(orderByUnion).includes(sorting)) {
    searchParams.set('sorting', 'desc');
    return redirect(`/surf?${searchParams.toString()}`);
  }
  if (!sortBy || !Object.values(sortByUnion).includes(sortBy)) {
    searchParams.set('sortby', 'trend');
    return redirect(`/surf?${searchParams.toString()}`);
  }

  return null;
};

function Surf() {
  const [searchParams, setSearchParams] = useSearchParams();

  // get data by activity service
  const { data } = useGetActivitiesQuery({
    // params has already check in loader some ignore ts in this
    // @ts-ignore
    sortBy: searchParams.get('sortBy') || sortByUnion.activityClickedCount,
    // @ts-ignore
    orderBy: searchParams.get('orderBy') || orderByUnion.descending,
    page: parseInt(searchParams.get('page') || '1', 10) || 1,
    countPerPage: 20,
  });

  return (
    <Container maxWidth="xl">
      <Box sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h2" color="initial">所有活動</Typography>

        {/* sortBy button group */}
        <ButtonGroup>
          <Button
            onClick={() => {
              setSearchParams((prevSearchParam) => {
                prevSearchParam.set('sortBy', sortByUnion.activityClickedCount.toString());
                return prevSearchParam;
              });
            }}
            variant={searchParams.get('sortBy') === sortByUnion.activityClickedCount.toString() ? 'contained' : undefined}
          >
            熱門活動
          </Button>
          <Button
            onClick={() => {
              setSearchParams((prevSearchParam) => {
                prevSearchParam.set('sortby', 'newest');
                return prevSearchParam;
              });
            }}
            variant={searchParams.get('sortby') === 'newest' ? 'contained' : undefined}
          >
            最新活動
          </Button>
        </ButtonGroup>

        {/* sorting button control */}
        <Button
          startIcon={searchParams.get('sorting') === 'desc' ? <KeyboardDoubleArrowDownIcon /> : <KeyboardDoubleArrowUpIcon />}
          onClick={() => {
            setSearchParams((prevSearchParam) => {
              prevSearchParam.set('orderBy', searchParams.get('orderBy') === 'descending' ? 'ascending' : 'descending');
              return prevSearchParam;
            });
          }}
          sx={{ width: '5em' }}
        >
          {searchParams.get('orderBy')}
        </Button>
      </Box>

      {/* data */}
      <Grid container spacing={3} sx={{ mt: 2, mb: 2 }}>
        {data?.searchData?.map((activity) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={activity.id}>
            <MainCard {...activity} />
          </Grid>
        ))}
      </Grid>

      {/* pagination */}
      <Box
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Pagination
          count={data?.totalPage}
          onChange={(event, number) => {
            setSearchParams((prevSearchParam) => {
              prevSearchParam.set('page', number.toString());
              return prevSearchParam;
            });
          }}
        />
      </Box>

    </Container>
  );
}

export default Surf;
