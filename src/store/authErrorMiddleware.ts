import { Middleware } from '@reduxjs/toolkit';

export const authErrorMiddleware: Middleware = () => (next) => (action) => {
  // filter error
  if (action.meta && action.error) {
    // filter tokenLogin query
    if (action.meta.arg.endpointName === 'tokenLogin') {
      return next(action);
    }

    if (action.payload && action.payload.originalStatus === 401) {
      window.location.href = '/login';
    }
    return next(action);
  }

  return next(action);
};
