import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user.slice";
import aiModelReducer from "./aiModel.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    aiModel: aiModelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
