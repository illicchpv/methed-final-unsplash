// В разделе API/Developers зарегистрироваться как разработчик для
//  https://unsplash.com/developers
// Создать application в разделе API/Developers
//  https://unsplash.com/oauth/applications
// unsplash user-authentication-workflow
//  https://unsplash.com/documentation/user-authentication-workflow
import {
  URL_AUTH,
  CLIENT_ID,
  RESPONSE_TYPE,
  REDIRECT_URI,
  SCOPE_STRING,
  SECRET_KEY,
} from './const.js';

export const URL_GET_TOKEN = 'https://unsplash.com/oauth/token';

const searchParams = new URLSearchParams('');
searchParams.append('client_id', CLIENT_ID);
searchParams.append('redirect_uri', REDIRECT_URI);
searchParams.append('response_type', RESPONSE_TYPE);
searchParams.append('scope', SCOPE_STRING);
export const authPageUrl = `${URL_AUTH}?${searchParams.toString()}`;

export const makeAuthParams = (code, err) => {
  return {
    client_id: CLIENT_ID, //	Your application’s access key.
    client_secret: SECRET_KEY, //	Your application’s secret key.
    redirect_uri: REDIRECT_URI, //	Your application’s redirect URI.
    code: (err ? 'err' : code), //	The authorization code supplied to the callback by Unsplash.
    grant_type: 'authorization_code', //	Value “authorization_code”.        
  };
}
