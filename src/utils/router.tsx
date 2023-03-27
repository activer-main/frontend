import MobileSidebar from 'components/Header/MobileSideBar';
import Home from 'pages/Home';
import { loader as homeLoader } from 'pages/Home/loader';
import Root from 'pages/root';
import React from 'react';
import Profile from 'pages/User/Profile';
import {
  RouteObject,
} from 'react-router-dom';
import Verify from 'pages/Verify';
import Register from 'pages/Register';
import Login from 'pages/Login';
import ProtectedRoute from 'routing/ProtectedRoute';
import User from 'pages/User';
import MainRoute from 'routing/MainRoute';

const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <MainRoute />,
        children: [
          {
            path: '/',
            element: <Home />,
            loader: homeLoader,
          },
          {
            path: 'sidebar',
            element: <MobileSidebar />,
          },
          {
            path: 'register',
            element: <Register />,
          },
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'verify',
            element: <Verify />,
          },
        ],
      },

      {
        element: <ProtectedRoute />,
        children: [{
          path: '/user',
          element: <User />,
          children: [
            {
              path: 'profile',
              element: <Profile />,
            },
          ],
        },
        ],
      },
    ],
  },
];

export default routerConfig;
