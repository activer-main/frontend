import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { authApi } from './auth/authService';
import authReducer from './auth/authSlice';
import searchReducer from './search/searchSlice';
import { activityApi } from './activity/activityService';
import { searchApi } from './search/searchService';
import { tagApi } from './tag/tagService';

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    [authApi.reducerPath]: authApi.reducer,
    [activityApi.reducerPath]: activityApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(searchApi.middleware)
    .concat(activityApi.middleware)
    .concat(tagApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// getting dispatch and selector type
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
