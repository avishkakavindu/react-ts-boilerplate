import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/auth.slice';
import apiSlice from './slices/api.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type TRootState = ReturnType<typeof rootReducer>;
export default store;
