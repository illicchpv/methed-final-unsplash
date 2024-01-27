
export const ACCESS_KEY = '5HKN-FQSq9cXLU8Xj80_YKixrim1ZBCIoxacqc73sL0';
export const SECRET_KEY = 'bLaj9yb-zky0XtOmQ1Ckqz5hrNUIzARdw_sQznWKebI';

export const REDIRECT_URI = 'http://localhost:3000';
// получаем что-то типа: :3000/?code=-1yoWrOKB9EQrMGJHGoIg5ZTIgIEp-iRIU23UZKAdIM
/* если
export const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob';
c этим REDIRECT_URI показывает стр:
Authorization code
z2KN353YPVDhsDxIfKzKgD10pgt8qfDEi08NySqY_bQ
*/

export const RESPONSE_TYPE = 'code';
export const CLIENT_ID = ACCESS_KEY;
export const SCOPE_STRING = 'public read_user read_photos write_likes';

export const URL_AUTH = 'https://unsplash.com/oauth/authorize';
export const URL_API = 'https://api.unsplash.com';
