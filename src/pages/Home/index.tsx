import React from 'react';
import Button from '@mui/material/Button';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { orderByUnion, sortByUnion } from 'types/request';
import { times } from 'lodash';
import { Paper, Skeleton } from '@mui/material';
import CardSlide from 'components/CardSlide';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import { selectUserInfo } from 'store/user/userSlice';
import { useGetActivitiesQuery, useGetRecommendActivityQuery } from 'store/activity/endpoints/getActivities';
import Hero from './Hero';

function Home() {
  const navigate = useNavigate();
  const userInfo = useAppSelector(selectUserInfo);
  const { data: trendData, isLoading: isLoadingTrendData } = useGetActivitiesQuery({
    sortBy: sortByUnion.TREND,
    orderBy: orderByUnion.DESC,
    page: 1,
    countPerPage: 12,
  });

  const { data: newestData, isLoading: isLoadingNewestData } = useGetActivitiesQuery({
    sortBy: sortByUnion.CREATEDAT,
    orderBy: orderByUnion.DESC,
    page: 1,
    countPerPage: 12,
  });

  const { data: recommendData, isLoading: isLoadingRecommendData } = useGetRecommendActivityQuery({
    page: 1,
    countPerPage: 12,
  });

  return (
    <>
      {/* hero */}
      <Hero />
      <Container
        component="main"
        maxWidth="xl"
      >

        {userInfo
        && (
          <Paper sx={{ p: 2, mb: 4 }} elevation={3}>
            <Box
              component="title"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 3,
                mb: 3,
              }}
            >
              <Typography component="h2" variant="h4">
                <BookmarkIcon />
                推薦你的活動
              </Typography>
              <Button endIcon={<NavigateNextIcon />} onClick={() => navigate(`/surf?sortBy=${sortByUnion.TREND}`)}>
                更多推薦活動
              </Button>
            </Box>

            {isLoadingRecommendData
          && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {times(4, (index) => (
                <Grid item xs={12} sm={6} lg={3} key={index}>
                  <Skeleton variant="rectangular" sx={{ height: '600px' }} />
                </Grid>
              ))}
            </Grid>
          )}
            {recommendData?.searchData
           && (
             <CardSlide data={recommendData.searchData} />
           )}
          </Paper>
        )}

        <Paper sx={{ p: 2, mb: 4 }} elevation={3}>
          <Box
            component="title"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 3,
              mb: 3,
            }}
          >
            <Typography component="h2" variant="h4">
              <BookmarkIcon />
              熱門活動
            </Typography>
            <Button endIcon={<NavigateNextIcon />} onClick={() => navigate(`/surf?sortBy=${sortByUnion.TREND}`)}>
              更多熱門活動
            </Button>
          </Box>

          {isLoadingTrendData
          && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {times(4, (index) => (
                <Grid item xs={12} sm={6} lg={3} key={index}>
                  <Skeleton variant="rectangular" sx={{ height: '600px' }} />
                </Grid>
              ))}
            </Grid>
          )}
          {trendData?.searchData
           && (
             <CardSlide data={trendData.searchData} />
           )}
        </Paper>

        <Paper sx={{ p: 2 }} elevation={3}>
          <Box
            component="title"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 3,
              mb: 3,
            }}
          >
            <Typography component="h2" variant="h4">
              <BookmarkIcon />
              最新活動
            </Typography>
            <Button endIcon={<NavigateNextIcon />} onClick={() => navigate(`/surf?sortBy=${sortByUnion.CREATEDAT}`)}>
              更多最新活動
            </Button>
          </Box>

          {isLoadingNewestData
          && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {times(4, (index) => (
                <Grid item xs={12} sm={6} lg={3} key={index}>
                  <Skeleton variant="rectangular" sx={{ height: '600px' }} />
                </Grid>
              ))}
            </Grid>
          )}
          {newestData?.searchData
           && (
             <CardSlide data={newestData.searchData} />
           )}
        </Paper>

      </Container>
    </>
  );
}

export default Home;
