import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {URL_GET_TOKEN, URL_GET_USER_INFO, makeAuthParams} from "./authUtils";
import {SS_KEY} from "../../api/const";

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

    console.log('👉authAsync code: ', code);
    // debugger; // ?

    return axios.post(URL_GET_TOKEN,
      makeAuthParams(code, ''),
      {
        headers: {'Content-Type': 'application/json'}
      })
      .then(function (response) {
        // debugger;
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;
        // console.log('access_token: ', access_token);
        return axios.get(URL_GET_USER_INFO,
          {
            headers: {'Authorization': `Bearer ${access_token}`, },
          })
          .then(function (response) {
            // console.log('response.data:', JSON.stringify(response.data, null, 2))
            response.data.code = code;
            response.data.access_token = access_token;
            response.data.refresh_token = refresh_token;
            response.data.request_limit = +response.headers['x-ratelimit-limit'];
            response.data.request_remaining = +response.headers['x-ratelimit-remaining'];

            const settings = JSON.parse(sessionStorage.getItem(SS_KEY));
            settings.auth = {
              code,
              access_token,
              refresh_token,
              userInfo: {
                name: response.data.name,
                largeImage: response.data.profile_image.large,
              }
            };
            sessionStorage.setItem(SS_KEY, JSON.stringify(settings));
            return response.data;
          });
      });
  }
);