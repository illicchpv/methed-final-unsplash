export const TEST_MENU = false;

export const SS_KEY = 'finalUnsplash';

const appPlace = 0; // 0-local
// const appPlace = 1; // 1-github 

const ACCESS_KEY_0 = '5HKN-FQSq9cXLU8Xj80_YKixrim1ZBCIoxacqc73sL0';
const SECRET_KEY_0 = 'bLaj9yb-zky0XtOmQ1Ckqz5hrNUIzARdw_sQznWKebI';
const REDIRECT_URI_0 = 'http://localhost:3000';
const SITE_ROOT_0 = '/'

const ACCESS_KEY_1 = 'n9-0aEfnqMhp1aX3zJ20L7ekd1-Tdy9E-sN6N3aCUVQ';
const SECRET_KEY_1 = 'JKq8eEU5ZewVxFJjXsvTPbmfh7qBI_2fecrfC38-Qfk';
const REDIRECT_URI_1 = 'https://illicchpv.github.io/methed-final-unsplash';
const SITE_ROOT_1 = '/methed-final-unsplash/'

export const ACCESS_KEY = appPlace === 0 ? ACCESS_KEY_0 : ACCESS_KEY_1 ;
export const SECRET_KEY = appPlace === 0 ? SECRET_KEY_0 : SECRET_KEY_1 ;

export const REDIRECT_URI = appPlace === 0 ? REDIRECT_URI_0 : REDIRECT_URI_1 ;
export const SITE_ROOT = appPlace === 0 ? SITE_ROOT_0 : SITE_ROOT_1 ;

// получаем что-то типа: :3000/?code=-1yoWrOKB9EQrMGJHGoIg5ZTIgIEp-iRIU23UZKAdIM
/* если как предложено на сайте сделать:
export const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob';
то c этим REDIRECT_URI показывает стр:
Authorization code
z2KN353YPVDhsDxIfKzKgD10pgt8qfDEi08NySqY_bQ
*/

export const RESPONSE_TYPE = 'code';
export const CLIENT_ID = ACCESS_KEY;
export const SCOPE_STRING = 'public read_user read_photos write_likes';

export const URL_AUTH = 'https://unsplash.com/oauth/authorize';
export const URL_API = 'https://api.unsplash.com';


/* ===loacalhost===================
Application name MethedDiplom
Description Final work on the React.Js course
Redirect URI http://localhost:3000
Public access 
Read user access
Read photos access
Write likes access

*/
/* === https://github.com/illicchpv/methed-final-unsplash ===================
Application name MethedDiplomGH
Description Final work on the React.Js course
Redirect URI https://illicchpv.github.io/methed-final-unsplash
Public access 
Read user access
Read photos access
Write likes access

Application ID 560723
Access Key n9-0aEfnqMhp1aX3zJ20L7ekd1-Tdy9E-sN6N3aCUVQ
Secret key JKq8eEU5ZewVxFJjXsvTPbmfh7qBI_2fecrfC38-Qfk

*/