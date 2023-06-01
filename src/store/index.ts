import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import userReducer from './user/userSlice';
import { userApi } from './user/userService';
import searchReducer from './search/searchSlice';
import { activityApi } from './activity/activityService';
import { tagApi } from './tag/tagService';

const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    [userApi.reducerPath]: userApi.reducer,
    [activityApi.reducerPath]: activityApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(userApi.middleware)
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

// for test
const rootReducer = combineReducers({
  auth: userReducer,
  [userApi.reducerPath]: userApi.reducer,
  [activityApi.reducerPath]: activityApi.reducer,
  [tagApi.reducerPath]: tagApi.reducer,
});

export function setupStore(preloadedState?: PreloadedState<TestRootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(tagApi.middleware)
      .concat(activityApi.middleware),
  });
}

export type TestRootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
