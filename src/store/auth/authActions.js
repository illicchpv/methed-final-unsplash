import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {URL_GET_TOKEN, makeAuthParams} from "../../api/auth";

// import {authAsync} from './store/auth/authActions';
// dispatch(authAsync(code));
export const authAsync = createAsyncThunk(
  'auth/fetch',
  (code, reduxTK) => { // const {getState, dispatch} = reduxTK;

    if (!code) {
      console.error('authAsync (!code)');
      debugger;
      return;
    }

    return axios.post(URL_GET_TOKEN,
      makeAuthParams(code, ''),
      {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(function (response) {
        response.data.code = code;
        return response.data;
      });
  }
);