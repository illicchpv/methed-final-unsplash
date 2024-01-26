import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from './auth/authSlice';
const authReducer = authSlice.reducer;

export const store = configureStore({
  reducer: {
    authReducer,
    // tokenReducer,
    // authReducer,
    // postsReducer,
    // postInfoReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // .concat(tokenMidleware),
});
