import React from 'react';
import {
  Typography, Grid, Box, Container,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { ReactComponent as Graphic } from './components/Graphic.svg';
import HeroSearch from './components/HeroSearch';

function HeroSection() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'primary',
        width: '100vw',
      }}
    >
      <Container maxWidth="xl" sx={{ padding: 5 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              在這屬於學生的社群中
              <br />
              找尋屬於自己的活動
            </Typography>
            <HeroSearch />
          </Grid>

          {/* right graphic */}
          <Grid item xs={12} sm={4} sx={{ position: 'relative', display: { md: 'block', xs: 'none' } }}>
            <Graphic />
            <Box sx={{
              width: 300,
              height: 300,
              bgcolor: blue[100],
              position: 'absolute',
              borderRadius: 5,
              zIndex: -1,
              top: 20,
              left: -30,
            }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>

  );
}

export default HeroSection;
