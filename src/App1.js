import _ from './App.module.css';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Route, Routes, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {assignId} from './utils/genRandomId';
import {authAsync} from './store/auth/authActions';
import {authSlice} from './store/auth/authSlice';
import classNames from 'classnames';
import {handleDoAuth, restoreCurPage} from './store/auth/authUtils';

const PAGES = [
  {
    name: 'test1', path: '/test1/*', navigate: '/test1',
    pageContent: <Test1 />
  },
  {
    name: 'Auth', path: '/tstauth/*', navigate: '/tstauth',
    pageContent: <Auth />
  },
  {
    name: 'root', path: '/*', navigate: '/',
    pageContent: <p>this page root</p>
  },
  {
    name: 'test2', path: '/test2/*', navigate: '/test2',
    pageContent: <Test2 />
  },
].map(assignId).sort((el1, el2) => (el1.navigate.length - el2.navigate.length));

const isPathSelected = (location_path, el) => {
  let selId = '';
  for (const pg of PAGES) {
    if (location_path.startsWith(pg.navigate)) selId = pg.id;
  }
  if (selId === el.id) return true; //  console.log('selId === el.id: ');
};

function Auth() {
  const dispatch = useDispatch();
  const {loading, error, code, access_token, refresh_token, userInfo} = useSelector(state => state.authReducer);
  // const linkClass = classNames(!!access_token && _.disabledLink, true && _.authLink);

  return (
    <div className={_.auth}>
      {/* <Link className={linkClass} to={url}>авторизоваться</Link> */}

      <button disabled={!!access_token}
        onClick={handleDoAuth}
      >авторизоваться</button>

      <button disabled={!access_token}
        onClick={() => {
          dispatch(authSlice.actions.authClear());
        }}
      >выйти</button>

      <p>
        loading: <span>{loading}</span> <br />
        error: <span>{error}</span> <br />
        code: <span>{code}</span> <br />
        access_token: <span>{access_token}</span> <br />
        refresh_token: <span>{refresh_token}</span> <br />
        name+:
        {userInfo.name && <>
          <span>{userInfo?.name}:</span>
          <img src={userInfo?.largeImage} alt='моё большое фото' /> <br />
          requests remaining/limit: {userInfo?.request_remaining}/{userInfo?.request_limit}<br />
        </>}

      </p>
    </div>
  );
}

function Test1() {

  return (
    <div>
      Test1
    </div>
  );
}
function Test2() {

  return (
    <div>
      test2
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  let location = useLocation();
  const code = useSearchParams()[0].get("code");
  const dispatch = useDispatch();
  const {requestCount} = useSelector(state => state.authReducer);
  console.log('requestCount: ', requestCount);


  useEffect(() => {
    if (code) {
      dispatch(authAsync(code));
    }
  }, [code, dispatch]);

  useEffect(() => {
    restoreCurPage(navigate, requestCount);
  }, [requestCount, navigate]);

  return (
    <>
      <div className={_.navigation}>
        {PAGES.map((el) => (
          <button key={el.id} className={isPathSelected(location.pathname, el) ? _.selected : ''}
            onClick={() => {
              navigate(el.navigate);
            }}
          >{el.name}</button>
        ))}
      </div>

      <Routes>
        {PAGES.map((el) => (
          <Route key={el.id} path={el.path} element={<>
            <div className={_.page}>
              {el.pageContent}
            </div>
          </>} />
        ))}
      </Routes>
    </>
  );
}

export default App;

/*

"{\"client_id\":\"5HKN-FQSq9cXLU8Xj80_YKixrim1ZBCIoxacqc73sL0\",
\"client_secret\":\"bLaj9yb-zky0XtOmQ1Ckqz5hrNUIzARdw_sQznWKebI\",
\"redirect_uri\":\"http://localhost:3000\",
\"code\":\"Rep4VWakTyDvixD7FLnpHw9Lq8GPgjKZbu-Ih_qKzb0\",
\"grant_type\":\"authorization_code\"}"

*/