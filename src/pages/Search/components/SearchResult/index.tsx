import React from 'react';
import { ActivityDataType } from 'types/data';
import { MainCard } from 'components/Card';
import { Grid, Typography } from '@mui/material';
import Loading from 'components/Loading';

interface SearchResultType {
  isLoading: boolean;
  searchResultData?: ActivityDataType[]
}

function SearchResult({ isLoading, searchResultData }: SearchResultType) {
  if (isLoading) {
    return <Grid item xs={12} sx={{ height: '20em' }}><Loading /></Grid>;
  }
  if (!searchResultData) {
    return null;
  }

  if (!(searchResultData?.length > 0)) {
    return (
      <Grid item xs={12}>
        <Typography variant="h4">查無資料</Typography>
      </Grid>
    );
  }

  return (
    <>
      {
        searchResultData.map((activity) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={activity.id}>
            <MainCard {...activity} />
          </Grid>
        ))
      }
    </>
  );
}

export default SearchResult;
