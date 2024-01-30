import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {getPhotoListUrl} from "./photoListUtils";
import {uniqByKeepFirst} from "../../utils/uniqByKey";

// import {photoListAsync} from "../../store/photoList/photoListActions";
// dispatch(photoListAsync(1)); // 1 -page
export const photoListAsync = createAsyncThunk(
  'photoList/fetch',
  (page, reduxTK) => { // const {getState, dispatch} = reduxTK;
    console.log('👉photoListAsync page: ', page);
    const {getState} = reduxTK;
    const access_token = getState().authReducer.access_token;
    const photoList = getState().photoListReducer.photoList;

    return axios.get(getPhotoListUrl(page),
      (access_token ? {headers: {'Authorization': `Bearer ${access_token}`}} : {})
    )
      .then(function (response) {
        const rezPhotos = response.data.map((el) => {
          // debugger
          return {
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
            },
          };
        });
        // debugger
        const len1 = photoList.length;
        const len2 = rezPhotos.length;
        const data = uniqByKeepFirst(
          [
            ...photoList,
            ...rezPhotos
          ], el => el.id
        );
        if (data.length !== (len1 + len2)) { // на всякий случай, чтоб не было повторения ключей
          console.warn(`postsRequestSuccessAfter newPosts.${data.length} !== (${len1} + ${len2}): `);
        }        
        const rez = {page, data}
        // debugger;
        return rez; // response.data;
      });
  }
);
