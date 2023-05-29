import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  Button, Chip, Grid, Pagination, Skeleton, Stack,
} from '@mui/material';
import { useGetActivitiesQuery } from 'store/activity/activityService';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { LoaderFunction, redirect, useSearchParams } from 'react-router-dom';
import { MainCard } from 'components/Card';
import { sortByUnion, orderByUnion } from 'types/request';
import { toast } from 'react-toastify';
import { times } from 'lodash';

export const surfLoader: LoaderFunction = ({ request }) => {
  const { searchParams } = new URL(request.url);
  const orderBy = searchParams.get('orderBy');
  const sortBy = searchParams.get('sortBy');
  const isValidOrderBy = Object.values(orderByUnion).includes(orderBy as orderByUnion);
  const isValidSortBy = Object.values(sortByUnion).includes(sortBy as sortByUnion);

  if (!isValidOrderBy) {
    if (orderBy) {
      toast.warn('排序參數錯誤，已重新導向至降序');
    }
    searchParams.set('orderBy', orderByUnion.DESC);
    return redirect(`/surf?${searchParams.toString()}`);
  }

  if (!isValidSortBy) {
    if (sortBy) {
      toast.warn('分類參數錯誤，已重新導向至熱門活動');
    }
    searchParams.set('sortBy', sortByUnion.TREND);
    return redirect(`/surf?${searchParams.toString()}`);
  }

  return null;
};

function Surf() {
  const [searchParams, setSearchParams] = useSearchParams();

  // get data by activity service
  const { data, isLoading } = useGetActivitiesQuery({
    // params has already check in surfLoader some ignore tye check in here
    sortBy: searchParams.get('sortBy') as sortByUnion,
    orderBy: searchParams.get('orderBy') as orderByUnion,
    page: parseInt(searchParams.get('page') || '1', 10) || 1,
    countPerPage: 24,
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} lg={2}>
          <Typography variant="h4" color="initial">所有活動</Typography>
        </Grid>

        {/* sortBy button group */}
        <Grid item xs={12} lg>
          <Stack spacing={2} direction="row">
            <Chip
              onClick={() => {
                setSearchParams((prevSearchParam) => {
                  prevSearchParam.set('sortBy', sortByUnion.TREND);
                  return prevSearchParam;
                });
              }}
              variant={searchParams.get('sortBy') === sortByUnion.TREND ? undefined : 'outlined'}
              label="熱門活動"
            />
            <Chip
              onClick={() => {
                setSearchParams((prevSearchParam) => {
                  prevSearchParam.set('sortBy', sortByUnion.CREATEDAT);
                  return prevSearchParam;
                });
              }}
              variant={searchParams.get('sortBy') === sortByUnion.CREATEDAT ? undefined : 'outlined'}
              label="最新活動"
            />
          </Stack>
        </Grid>

        {/* sorting button control */}
        <Grid item>
          <Button
            startIcon={
              searchParams.get('orderBy') === orderByUnion.DESC
                ? <KeyboardDoubleArrowDownIcon />
                : <KeyboardDoubleArrowUpIcon />
            }
            onClick={() => {
              setSearchParams((prevSearchParam) => {
                prevSearchParam.set(
                  'orderBy',
                  searchParams.get('orderBy') === orderByUnion.DESC
                    ? 'ascending'
                    : 'descending',
                );
                return prevSearchParam;
              });
            }}
          >
            排序
          </Button>
        </Grid>
      </Grid>

      {/* data */}

      <Grid item xs={12}>
        <Grid container spacing={3} sx={{ mt: 2, mb: 2 }}>
          {isLoading && times(12, (index) => (
            <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
              <Skeleton sx={{ height: 490 }} key={index} variant="rectangular" />
            </Grid>
          ))}
          {data?.searchData?.map((activity) => (
            <Grid item xs={12} sm={6} md={4} xl={3} key={activity.id}>
              <MainCard {...activity} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* pagination */}
      <Grid item xs={12}>
        <Pagination
          sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}
          count={data?.totalPage}
          onChange={(event, number) => {
            setSearchParams((prevSearchParam) => {
              prevSearchParam.set('page', number.toString());
              return prevSearchParam;
            });
          }}
        />
      </Grid>

    </Container>
  );
}

export default Surf;
