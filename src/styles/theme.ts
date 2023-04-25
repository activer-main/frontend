import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const theme = responsiveFontSizes(createTheme({
  typography: {
    fontFamily: [
      'Noto Sans TC',
      'Roboto',
      'sans-serif',
    ].join(','),
  },
}));
