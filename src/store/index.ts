import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import userReducer from './user/userSlice';
import searchReducer from './search/searchSlice';
import { authErrorMiddleware } from './authErrorMiddleware';
import { api } from './service';

const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authErrorMiddleware)
    .concat(api.middleware),
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
  [api.reducerPath]: api.reducer,
});

export function setupStore(preloadedState?: PreloadedState<TestRootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(api.middleware),
  });
}

export type TestRootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
