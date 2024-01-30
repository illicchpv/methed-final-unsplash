import _ from './App.module.css';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Route, Routes, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {assignId} from './utils/genRandomId';
import {authAsync} from './store/auth/authActions';
import {authSlice} from './store/auth/authSlice';
import classNames from 'classnames';
import {handleDoAuth, restoreCurPage} from './store/auth/authUtils';
import {Main} from './components/Main/Main';
import {Tests, TestAuth, TestList} from './components/Tests/Tests';
import {MainPicListItem} from './components/MainPicListItem/MainPicListItem';
import {ErrorPage} from './components/ErrorPage/ErrorPage';
import {TestsHelper} from './components/TestsHelper/TestsHelper';
import {REDIRECT_URI, SITE_ROOT, TEST_MENU} from './api/const';
import {Modal} from './components/Modal/Modal';
import {MainPicItem} from './components/MainPicItem/MainPicItem';


function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {access_token} = useSelector(state => state.authReducer);
  console.log('access_token: ', access_token);

  let code = useSearchParams()[0].get("code");
console.log('===========1code: ', code);
  if (!code && !access_token) {
    const hr = window.location.href;
console.log('hr: ', hr);
    if (hr.includes('?code=')) {
      code = hr.split('?code=')[1].split('#')[0];
console.log('2code: ', code);
      const newUrl = hr.split('?code=')[0];
console.log('newUrl: ', newUrl);
// console.log('REDIRECT_URI: ', REDIRECT_URI);
      window.history.replaceState(null, null, SITE_ROOT);
    }
  }
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
      {TEST_MENU && <TestsHelper pages={['/test/auth', '/test/list', '/test/item',]} />}
      <Routes>

        <Route path="/" element={<Main />}>

          <Route path='/pic/:id' element={
            <Modal closePath='/'>
              <MainPicItem />
            </Modal>
          } />

        </Route>

        {TEST_MENU && <>
          <Route path="/test" element={<Tests />}>
            <Route path='auth' element={<TestAuth />} />
            <Route path="list" element={<TestList />}>
              <Route path='/test/list/:id' element={
                <Modal closePath='/test/list'>
                  <MainPicItem />
                </Modal>
              } />
            </Route>
            <Route path="item" element={<p>test item</p>} />
          </Route>
        </>}

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
