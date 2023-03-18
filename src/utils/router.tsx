import MobileSidebar from 'components/Header/MobileSideBar';
import Home from 'pages/Home';
import { loader as homeLoader } from 'pages/Home/loader';
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
        loader: homeLoader,
        children: [
          {
            path: '/sidebar',
            element: <MobileSidebar />,
          },
        ],
      },
    ],
  },
];

export default routerConfig;
