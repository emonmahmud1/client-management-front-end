import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "@/store/slices/app-slice";
import { apiSlice } from "@/store/api-slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
