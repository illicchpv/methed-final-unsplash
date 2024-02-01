import {createSlice} from "@reduxjs/toolkit";
import {photoListAsync} from "./photoListActions";

const initialState = {
  loading: 0,
  error: '',
  photoList: [],
  page: 0,
};

export const photoListSlice = createSlice({
  name: 'photoList',
  initialState,

  // import {photoListSlice} from './store/photoList/photoListSlice';
  reducers: {
    // dispatch(photoListSlice.actions.photoListClear());
    photoListClear: (state, action) => {
      state.loading = 0;
      state.error = '';
      state.photoList = [];
      state.page = 0;
    },
    // dispatch(photoListSlice.actions.photoListUpdateLikeId(id, true));
    photoListUpdateLikeId: (state, action) => {
      const id = action.payload.id;
      const like = action.payload.like;
      const photoItem = state.photoList.find((el) => el.id === id);
      // console.log('photoItem: ', photoItem);
      if(photoItem) photoItem.liked_by_user = like;
      state.loading = 0;
      state.error = '';
    },
  },

  // const {photoList} = useSelector(state => state.photoListReducer.photoList);
  // const photoList = getState().photoListReducer.photoList;
  extraReducers: {
    [photoListAsync.pending.type]: (state, action) => {
      state.loading += 1;
      state.error = '';
      // state.photoList = [];
      // state.page = 0;
    },
    [photoListAsync.fulfilled.type]: (state, action) => {
      // debugger
      state.loading -= 1;
      if (state.loading < 0) {
        // console.log('state.loading < 0: ', state.loading);
        state.loading = 0;
      }
      state.error = '';
      state.photoList = action.payload.data;
      state.page = action.payload.page;
    },
    [photoListAsync.rejected.type]: (state, action) => {
      // debugger
      state.loading -= 1;
      if (state.loading < 0) {
        // console.log('state.loading < 0: ', state.loading);
        state.loading = 0;
      }
      state.error = action.error.message;
      // state.photoList = [];
      // state.page = 0;
    },
  },
});

// export default photoListSlice.reducer; // это только для store/index.js