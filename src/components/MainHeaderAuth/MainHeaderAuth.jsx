import style from './MainHeaderAuth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Text from '../../UI/Text';
import Preloader from '../../UI/Preloader';
import {handleDoAuth} from "../../store/auth/authUtils";
import {authSlice} from '../../store/auth/authSlice';


export function MainHeaderAuth() {
  const dispatch = useDispatch();
  let {loading, error, access_token, userInfo} = useSelector(state => state.authReducer);
  let logIn = !!userInfo?.name;
  const [logoutVisible, setLogoutVisible] = useState(false);

  return (<>
    <div className={style.container}>
      {loading ? (<Preloader />) :
        (<>
          {!logIn &&
            (<button className={style.btn}
              onClick={handleDoAuth}
            ><LoginIcon width={128} height={128} /></button>
            )
          }
          {logIn &&
            (<div className={style.userBlock}>
              <button className={style.btn}
                onClick={() => {setLogoutVisible((prev) => !prev);}}
              ><img className={style.userPic} src={userInfo?.largeImage}
                alt='моё большое фото' /></button>
              <button className={style.userName}
                onClick={() => {setLogoutVisible((prev) => !prev);}}
              >{userInfo?.name}</button>
              {logoutVisible && (
                <button className={style.logout}
                  onClick={() => {
                    dispatch(authSlice.actions.authClear());
                  }}
                >Logout</button>
              )}
            </div>)}
        </>)
      }
    </div>
  </>);
}