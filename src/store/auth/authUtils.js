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
  URL_API,
  SITE_ROOT,
} from '../../api/const';

// https://unsplash.com/documentation/user-authentication-workflow#authorization-workflow
export const URL_GET_TOKEN = 'https://unsplash.com/oauth/token';

// https://unsplash.com/documentation#get-the-users-profile
export const URL_GET_USER_INFO = `${URL_API}/me`;

export const makeAuthParams = (code, err) => {
  return {
    client_id: CLIENT_ID, //	Your application’s access key.
    client_secret: SECRET_KEY, //	Your application’s secret key.
    redirect_uri: REDIRECT_URI, //	Your application’s redirect URI.
    code: (err ? 'err' : code), //	The authorization code supplied to the callback by Unsplash.
    grant_type: 'authorization_code', //	Value “authorization_code”.        
  };
};

export const handleDoAuth = (add) => {
  // console.log('add: ', add);
  // store current page
  const pagePath = window.location.pathname;
  console.log('window.location.pathname: ', pagePath);
  sessionStorage.setItem('finalUnsplash', JSON.stringify({pagePath: pagePath}));

  // redirect to auth unsplash page
  const searchParams = new URLSearchParams('');
  searchParams.append('client_id', CLIENT_ID);
  searchParams.append('redirect_uri', REDIRECT_URI);
  searchParams.append('response_type', RESPONSE_TYPE);
  searchParams.append('scope', SCOPE_STRING);
  const authPageUrl = `${URL_AUTH}?${searchParams.toString()}`;
  window.location.href = authPageUrl;
};

export const restoreCurPage = (navigate, requestCount) => {
  const settings = JSON.parse(sessionStorage.getItem('finalUnsplash')); // , JSON.stringify({pagePath: pagePath})
  if (settings && settings?.pagePath) {
    let path = settings.pagePath; settings.pagePath = '';
    path = path.replaceAll(SITE_ROOT, '/')
    console.log(`requestCount: [${requestCount}] ======== path: [${path}] ===========`);
    sessionStorage.setItem('finalUnsplash', JSON.stringify(settings));
    navigate(path);
  }
};