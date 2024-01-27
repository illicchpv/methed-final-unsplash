import {createSlice} from "@reduxjs/toolkit";
import {authAsync} from "./authActions";

const initialState = {
  loading: false,
  error: '',
  code: '',
  access_token: '',
  refresh_token: '',
  userInfo: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  // import {authSlice} from './store/auth/authSlice';
  // dispatch(authSlice.actions.authClear());
  reducers: {
    authClear: (state, action) => {
      // debugger;
      state.loading = false;
      state.error = '';
      state.code = '';
      state.access_token = '';
      state.refresh_token = '';
      state.userInfo = {};
    }
  },

  // const {access_token} = useSelector(state => state.authReducer);
  extraReducers: {
    [authAsync.pending.type]: (state, action) => {
      state.loading = true;
      state.error = '';
      state.userInfo = {};
    },
    [authAsync.fulfilled.type]: (state, action) => {
      // debugger;
      state.loading = false;
      state.error = '';
      state.code = action.payload.code;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.userInfo = {
        name: action.payload.name,
        largeImage: action.payload.profile_image.large,
      };
    },
    [authAsync.rejected.type]: (state, action) => {
      // debugger;
      state.loading = false;
      state.error = action.error.message;
      state.code = '';
      state.access_token = '';
      state.refresh_token = '';
      state.userInfo = {};
    },
  },
});

// export default authSlice.reducer; // это только для store/index.js