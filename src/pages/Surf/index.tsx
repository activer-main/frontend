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
import { ActivitiesRequestType, sortByUnion, sortingUnion } from 'types/request';

export const surfLoader: LoaderFunction = ({ request }) => {
  const { searchParams } = new URL(request.url);
  const sorting = searchParams.get('sorting');
  const sortBy = searchParams.get('sortby');

  if (!sorting || !sortingUnion.includes(sorting)) {
    searchParams.set('sorting', 'desc');
    return redirect(`/surf?${searchParams.toString()}`);
  }
  if (!sortBy || !sortByUnion.includes(sortBy)) {
    searchParams.set('sortby', 'trend');
    return redirect(`/surf?${searchParams.toString()}`);
  }

  return null;
};

function Surf() {
  const [searchParams, setSearchParams] = useSearchParams();

  // get data by activity service
  const { data } = useGetActivitiesQuery({
    sortby: searchParams.get('sortby') as ActivitiesRequestType['sortby'] || 'trend',
    sorting: searchParams.get('sorting') as ActivitiesRequestType['sorting'] || 'desc',
    page: parseInt(searchParams.get('page') || '1', 10) || 1,
    per: 20,
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
                prevSearchParam.set('sortby', 'trend');
                return prevSearchParam;
              });
            }}
            variant={searchParams.get('sortby') === 'trend' ? 'contained' : undefined}
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
              prevSearchParam.set('sorting', searchParams.get('sorting') === 'desc' ? 'asc' : 'desc');
              return prevSearchParam;
            });
          }}
          sx={{ width: '5em' }}
        >
          {searchParams.get('sorting')}
        </Button>
      </Box>

      {/* data */}
      <Grid container spacing={3} sx={{ mt: 2, mb: 2 }}>
        {data?.searchResultData.map((activity) => (
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
          count={data?.maxPage}
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
