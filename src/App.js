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
import {Tests, TestAuth} from './components/Tests/Tests';
import {MainPicListItem} from './components/MainPicListItem/MainPicListItem';
import {ErrorPage} from './components/ErrorPage/ErrorPage';
import {TestsHelper} from './components/TestsHelper/TestsHelper';
import {TEST_MENU} from './api/const';


function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const code = useSearchParams()[0].get("code");
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
          <Route path="pic/:id" element={<MainPicListItem />} />
        </Route>

        {TEST_MENU && <>
          <Route path="/test" element={<Tests />}>
            <Route path='auth' element={<TestAuth />} />
            <Route path="list" element={<p>test list</p>} />
            <Route path="item" element={<p>test item</p>} />
          </Route>
        </>}
        
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
