import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";
import roomSlice from "./roomSlice";
import authSlice from "./authSlice";
import usersSlice from "./usersSlice";

export const store = configureStore({
  reducer: {
    game: gameSlice,
    room: roomSlice,
    auth: authSlice,
    users: usersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
