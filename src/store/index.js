import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from './auth/authSlice';
import {photoListSlice} from './photoList/photoListSlice';
import {photoItemSlice} from './photoItem/photoItemSlice';

const authReducer = authSlice.reducer;
const photoListReducer = photoListSlice.reducer;
const photoItemReducer = photoItemSlice.reducer;

export const store = configureStore({
  reducer: {
    authReducer,
    photoListReducer,
    photoItemReducer,
    // postsReducer,
    // postInfoReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // .concat(tokenMidleware),
});
