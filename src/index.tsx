import React from 'react';
import ReactDOM from 'react-dom/client';
import routerConfig from 'utils/router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';

const router = createBrowserRouter(routerConfig);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
