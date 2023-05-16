import React from 'react';
import {
  Button, Typography, Grid, Box, Container,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { ReactComponent as Graphic } from './components/Graphic.svg';

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
            <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Activer
              <br />
              活動者
            </Typography>
            <Typography variant="h3" sx={{ mb: 4 }}>
              在這屬於學生的社群中
              <br />
              找尋屬於自己的活動
            </Typography>
            <Button variant="contained" sx={{ px: 5, py: 2, borderRadius: 0 }}>
              Book now
            </Button>
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
