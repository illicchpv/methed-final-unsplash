import {createSlice} from "@reduxjs/toolkit";
import {photoItemAsync, photoItemBadAsync, photoItemLikeAsync} from "./photoItemActions";

const initialState = {
  loading: 0,
  error: '',
  photoItem: {},
};

export const photoItemSlice = createSlice({
  name: 'photoItem',
  initialState,

  // import {photoItemSlice} from './store/photoItem/photoItemSlice';
  // dispatch(photoItemSlice.actions.photoItemClear());
  reducers: {
    photoItemClear: (state, action) => {
      state.loading = 0;
      state.error = '';
      state.photoItem = {};
    }
  },

  // const {photoItem} = useSelector(state => state.photoItemReducer.photoItem);
  // const photoItem = getState().photoItemReducer.photoItem;
  extraReducers: {
    // photoItemAsync
    [photoItemAsync.pending.type]: (state, action) => {
      // debugger;
      state.loading += 1;
      state.error = '';
    },
    [photoItemAsync.fulfilled.type]: (state, action) => {
      // debugger
      state.loading -= 1;
      if(state.loading < 0){
        // console.log('state.loading < 0: ', state.loading);
        state.loading = 0;
      }
      state.error = '';
      state.photoItem = action.payload;
    },
    [photoItemAsync.rejected.type]: (state, action) => {
      // debugger
      state.loading -= 1;
      if(state.loading < 0){
        // console.log('state.loading < 0: ', state.loading);
        state.loading = 0;
      }
      state.error = action.error.message;
    },
    // photoItemLikeAsync
    [photoItemLikeAsync.pending.type]: (state, action) => {
      // debugger;
      state.loading += 1;
      state.error = '';
    },
    [photoItemLikeAsync.fulfilled.type]: (state, action) => {
      // debugger
      state.loading -= 1;
      if(state.loading < 0){
        // console.log('state.loading < 0: ', state.loading);
        state.loading = 0;
      }
      state.error = '';
      state.photoItem.liked_by_user = true;
    },
    [photoItemLikeAsync.rejected.type]: (state, action) => {
      // debugger
      state.loading -= 1;
      if(state.loading < 0){
        // console.log('state.loading < 0: ', state.loading);
        state.loading = 0;
      }
      state.error = action.error.message;
    },
    // photoItemBadAsync
    [photoItemBadAsync.pending.type]: (state, action) => {
      // debugger;
      state.loading += 1;
      state.error = '';
    },
    [photoItemBadAsync.fulfilled.type]: (state, action) => {
      // debugger
      state.loading -= 1;
      if(state.loading < 0){
        // console.log('state.loading < 0: ', state.loading);
        state.loading = 0;
      }
      state.error = '';
      state.photoItem.liked_by_user = false;
    },
    [photoItemBadAsync.rejected.type]: (state, action) => {
      // debugger
      state.loading -= 1;
      if(state.loading < 0){
        // console.log('state.loading < 0: ', state.loading);
        state.loading = 0;
      }
      state.error = action.error.message;
    },
  },
});
