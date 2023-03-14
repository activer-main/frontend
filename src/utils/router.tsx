import Home from 'pages/Home';
import Root from 'pages/root';
import React from 'react';
import {
  RouteObject,
} from 'react-router-dom';

const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
];

export default routerConfig;
