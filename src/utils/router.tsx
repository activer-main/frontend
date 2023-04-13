import MobileSidebar from 'components/Header/MobileSideBar';
import ErrorBoundary from 'pages/Error';
import Home from 'pages/Home';
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
import Detail from 'pages/Detail';
import Manage from 'pages/User/Manage';
import Search from 'pages/Search';

const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <MainRoute />,
        children: [
          {
            path: '/',
            element: <Home />,
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
          {
            path: '/detail/:id',
            element: <Detail />,
          },
          {
            path: '/search',
            element: <Search />,
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
            {
              path: 'manage/:type?',
              element: <Manage />,
            },
          ],
        },
        ],
      },
    ],
  },
];

export default routerConfig;
