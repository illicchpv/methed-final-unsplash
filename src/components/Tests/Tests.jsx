import {Outlet} from "react-router-dom";
import _ from './Tests.module.css'
import {useDispatch, useSelector} from "react-redux";
import {handleDoAuth} from "../../store/auth/authUtils";
import {authSlice} from "../../store/auth/authSlice";

export function Tests(props) {

  return (<div className={_.Tests}>
    <Outlet />
  </div>);
}

export function TestAuth() {
  const dispatch = useDispatch();
  const {loading, error, code, access_token, refresh_token, userInfo} = useSelector(state => state.authReducer);

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