
import {CLIENT_ID, URL_API} from "../../api/const";

// https://api.unsplash.com/photos?pade=1&per_page=2&client_id=5HKN-FQSq9cXLU8Xj80_YKixrim1ZBCIoxacqc73sL0

export const PICTURES_PER_PAGE = 24;

export function getPhotoListUrl(page = 1){
  return `${URL_API}/photos?page=${page}&per_page=${PICTURES_PER_PAGE}&client_id=${CLIENT_ID}`
}