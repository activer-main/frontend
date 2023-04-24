import React from 'react';
import { useGetNewestActivityQuery, useGetTrendActivityQuery } from 'store/activity/activityService';
import Button from '@mui/material/Button';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Loading from 'components/Loading';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import { MainCard } from 'components/Card';
import Hero from './Hero';

function Home() {
  const { data: trendData, isLoading: isLoadingTrendData } = useGetTrendActivityQuery({
    page: 1,
    per: 4,
  });
  const { data: newestData, isLoading: isLoadingNewestData } = useGetNewestActivityQuery({
    page: 1,
    per: 4,
  });

  return (
    <>
      {/* hero */}
      <Hero />
      <Container
        component="main"
        maxWidth="xl"
      >

        {/* Trend activity */}
        {/* Trend header */}
        <Box
          component="title"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 3,
          }}
        >
          <Typography component="h2" variant="h4">
            <BookmarkIcon />
            熱門活動
          </Typography>
          <Button endIcon={<NavigateNextIcon />}>
            更多熱門活動
          </Button>
        </Box>

        {/* Trend cards */}
        {isLoadingTrendData && trendData
          ? <Loading />
          : (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {
                // eslint-disable-next-line
                trendData?.searchResultData.map((activity) => (
                  <Grid item xs={12} sm={6} lg={3}>
                    {/* <MainCard {...activity} /> */}
                  </Grid>
                ))
              }
            </Grid>
          )}

        {/* Newest activity */}
        {/* Newest header */}
        <Box
          component="title"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 3,
          }}
        >
          <Typography component="h2" variant="h4">
            <BookmarkIcon />
            最新活動
          </Typography>
          <Button endIcon={<NavigateNextIcon />}>
            更多最新活動
          </Button>
        </Box>

        {/* Newest cards */}
        {isLoadingNewestData ? <Loading />
          : (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {
                // eslint-disable-next-line
                newestData?.searchResultData.map((activity) => (
                  <Grid item xs={12} sm={6} lg={3}>
                    {/* <MainCard {...activity} /> */}
                  </Grid>
                ))
              }
            </Grid>
          )}

      </Container>
    </>
  );
}

export default Home;
