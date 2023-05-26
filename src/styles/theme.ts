import { grey } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const theme = responsiveFontSizes(createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
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
    secondary: {
      main: '#f58f2a',
    },
  },
}));
