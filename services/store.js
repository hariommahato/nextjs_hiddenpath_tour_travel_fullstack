import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { adminInteractionApi } from "./adminInteraction";
export const store = configureStore({
  reducer: {
    [adminInteractionApi.reducerPath]:adminInteractionApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminInteractionApi.middleware)
});

setupListeners(store.dispatch);