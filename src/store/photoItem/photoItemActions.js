import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {getPhotoItemUrl, setLikePhotoItemUrl} from "./photoItemUtils";
import {photoListSlice} from "../photoList/photoListSlice";
import {takeAccessToken} from "../../utils/takeAccessToken";

// import {photoItemAsync} from "../../store/photoItem/photoItemActions";
// dispatch(photoItemAsync(id)); // 
export const photoItemAsync = createAsyncThunk(
  'photoItem/fetch',
  (id, reduxTK) => { // const {getState, dispatch} = reduxTK;
    const {getState} = reduxTK;
    const access_token = takeAccessToken(getState);
    // let access_token = getState().authReducer.access_token;
    // const settings = JSON.parse(localStorage.getItem(SS_KEY));
    // if (!access_token && settings && settings.auth) {
    //   access_token = settings.auth.access_token;
    // }

    console.log('👉photoItemAsync id: ', id, `access_token: ${access_token}`);
    // debugger; // ?

    return axios.get(getPhotoItemUrl(id),
      (access_token ? {headers: {'Authorization': `Bearer ${access_token}`}} : {})
    )
      .then(function (response) {
        // debugger
        const el = response.data;
        const rez = {
          id: el.id,
          created_at: el.created_at,
          width: el.width,
          height: el.height,
          color: el.color,
          description: el.description ?? el.alt_description,
          alt_description: el.alt_description,
          likes: el.likes,
          liked_by_user: el.liked_by_user,
          urls: {
            regular: el.urls.regular,
            small: el.urls.small,
            thumb: el.urls.thumb,
          },
          user: {
            id: el.user.id,
            username: el.user.username,
            location: el.user.location,
            portfolio_url: el.user.portfolio_url,
            profile_image: el.user.profile_image.small,
            profile_image_m: el.user.profile_image.medium,
          },
        };

        return rez;
      });
  }
);

// import {photoItemLikeAsync} from "../../store/photoItem/photoItemActions";
// dispatch(photoItemLikeAsync(id)); // 
export const photoItemLikeAsync = createAsyncThunk(
  'photoItemLike/fetch',
  (id, reduxTK) => { // const {getState, dispatch} = reduxTK;
    // console.log('photoItemLikeAsync id: ', id);
    const {getState, dispatch} = reduxTK;
    const access_token = takeAccessToken(getState);
    // let access_token = getState().authReducer.access_token;
    // const settings = JSON.parse(localStorage.getItem(SS_KEY));
    // if (!access_token && settings && settings.auth) {
    //   access_token = settings.auth.access_token;
    // }

    console.log('👉photoItemLikeAsync id: ', id, `access_token: ${access_token}`);
    // debugger; // ?

    return axios.post(setLikePhotoItemUrl(id),
      {},
      (access_token ? {headers: {'Authorization': `Bearer ${access_token}`}} : {})
    )
      .then(function (response) {
        dispatch(photoItemAsync(id));
        dispatch(photoListSlice.actions.photoListUpdateLikeId({id, like:true}));
        return true;
      });
  }
);

// import {photoItemLikeAsync} from "../../store/photoItem/photoItemActions";
// dispatch(photoItemLikeAsync(id)); // 
export const photoItemBadAsync = createAsyncThunk(
  'photoItemLike/fetch',
  (id, reduxTK) => { // const {getState, dispatch} = reduxTK;
    const {getState, dispatch} = reduxTK;
    const access_token = takeAccessToken(getState);
    // let access_token = getState().authReducer.access_token;
    // const settings = JSON.parse(localStorage.getItem(SS_KEY));
    // if (!access_token && settings && settings.auth) {
    //   access_token = settings.auth.access_token;
    // }

    console.log('👉photoItemBadAsync id: ', id, `access_token: ${access_token}`);
    // debugger; // ?

    return axios.delete(setLikePhotoItemUrl(id),
      (access_token ? {headers: {'Authorization': `Bearer ${access_token}`}} : {})
    )
      .then(function (response) {
        // debugger;
        dispatch(photoItemAsync(id));
        dispatch(photoListSlice.actions.photoListUpdateLikeId({id, like:false}));
        return false;
      });
  }
);
