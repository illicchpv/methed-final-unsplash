import {SS_KEY} from "../api/const";

export function takeAccessToken(getState) {
  let access_token = getState().authReducer.access_token;
  const settings = JSON.parse(sessionStorage.getItem(SS_KEY));
  if (!access_token && settings && settings.auth) {
    access_token = settings.auth.access_token;
  }
  return access_token;
}
