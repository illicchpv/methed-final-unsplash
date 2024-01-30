// https://unsplash.com/documentation#get-a-photo
import {CLIENT_ID, URL_API} from "../../api/const";

export function getPhotoItemUrl(id){
  return `${URL_API}/photos/${id}?&client_id=${CLIENT_ID}`
}

export function setLikePhotoItemUrl(id){
  return `${URL_API}/photos/${id}/like?&client_id=${CLIENT_ID}`
}