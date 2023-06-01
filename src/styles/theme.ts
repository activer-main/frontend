import { blue, grey } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const theme = responsiveFontSizes(createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif',
    ].join(','),
    h2: {
      fontWeight: 'bold',
      letterSpacing: 2,
    },
    body2: {
      color: grey[500],
    },
  },
  palette: {
    primary: {
      main: '#4C3D3D',
    },
    secondary: blue,
  },
}));
