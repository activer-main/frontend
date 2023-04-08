import React from 'react';
import ReactDOM from 'react-dom/client';
import routerConfig from 'utils/router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import { ThemeProvider } from '@mui/material';
import { theme } from 'styles/theme';
import './index.scss';

const router = createBrowserRouter(routerConfig);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
