import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import _ from './Tests.module.css';
import {useDispatch, useSelector} from "react-redux";
import {handleDoAuth} from "../../store/auth/authUtils";
import {authSlice} from "../../store/auth/authSlice";
import {getPhotoListUrl} from "../../store/photoList/photoListUtils";
import {photoListSlice} from "../../store/photoList/photoListSlice";
import {photoListAsync} from "../../store/photoList/photoListActions";
import like0 from "../../img/Like_0.svg";
import like1 from "../../img/Like_1.svg";
import {useEffect, useRef, useState} from "react";
import {MainPicListItem} from "../MainPicListItem/MainPicListItem";

export function Tests(props) {

  return (<div className={_.Tests}>
    <Outlet />
  </div>);
}

export function TestList(props) {
  // const url = getPhotoListUrl(1);
  const dispatch = useDispatch();
  const {loading, error, photoList, page} = useSelector(state => state.photoListReducer);
  const userInfo = useSelector(state => state.authReducer.userInfo);
  const logIn = !!userInfo?.name;
  const endList = useRef(null);
  const navigate = useNavigate();
  const doAutoLoad = false;

  const c = endList.current;
  useEffect(() => {
    let observer = undefined;
    if (!loading && !error) {
      // console.log('page: ', page);
      observer = new IntersectionObserver((entries) => {
        // console.log('entries[0].isIntersecting: ', entries[0].isIntersecting);
        if (entries[0].isIntersecting) {
          const nn = page + 1;
          dispatch(photoListAsync(nn));
        }
      }, {rootMargin: '100px'});

      if (doAutoLoad) {
        if (c) {
          observer.observe(c);
          return () => {
            observer.unobserve(c);
          };
        } else {
          dispatch(photoListAsync(1));
        }
      } else {
        if (page === 0) dispatch(photoListAsync(1));
      }
    }
  }, [page, loading, error, dispatch, doAutoLoad, c]);

  return (<div className={_.TestList}>
    <div className={_.buttons}>
      <button
        onClick={() => {
          dispatch(photoListSlice.actions.photoListClear());
        }}
      >clear</button>

      <button
        onClick={() => {
          dispatch(photoListAsync(page + 1));
        }}
      >load next</button>
    </div>


    <div className={_.content}>
      <h1>Photo List (загружено страниц: {page})</h1>
      <ul>
        {photoList.length === 0 && <li className={_.emptyList}>нет фотографий</li>}
        {photoList.length !== 0 && <>
          {photoList.map((el) => {

            return <MainPicListItem key={el.id} logIn={logIn} el={el} />

            // return <>
            //   <li key={el.id}>
            //     <div className={_.imgBox}>

            //       {logIn &&
            //         <button className={_.likes + ' ' + (el.liked_by_user && _.likeActive)}
            //           title={'всего ' + el.likes + ' лаек. Вы можете отметить это фото'}></button>
            //       }
            //       {!logIn &&
            //         <button className={_.likes}
            //           title={'всего ' + el.likes + ' лаек. Вы можете поставить/снять свой лайк после авторизации'}></button>
            //       }

            //       <Link to={"/test/list/" + el.id}><img className={_.listImg} src={el.urls.thumb} alt={el.alt_description} /></Link>

            //       <h2>
            //         <a href={el.user.portfolio_url} target="_blank" rel="noreferrer"
            //           title={el.user.portfolio_url && "перейти на portfolio автора"}
            //         >
            //           <img className={_.authPhoto} src={el.user.profile_image} alt="" />
            //         </a>
            //         <span title={'проживает в: ' + el.user.location}>{el.user.username}</span>
            //       </h2>

            //       <h3 title={"описание фото:\r\n" +
            //         el.description
            //       }>{el.description}</h3>

            //     </div>
            //   </li>
            // </>;
          })}
        </>}

        <li className={_.transparent} key="999991"></li>
        <li className={_.transparent} key="999992"></li>
        <li className={_.transparent} key="999993"></li>
        <li className={_.transparent} key="999994"></li>
        {error && <li key="999997" className={_.error}>{error}</li>}
        {loading > 0 && <li key="999998" className={_.waitIndicator}>загружаем...</li>}
        {doAutoLoad && <li ref={endList} key="999999" className={_.autoLoader}></li>}
      </ul>
    </div>
    <Outlet />
  </div >);
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