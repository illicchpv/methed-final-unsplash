import _ from './MainPicList.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {photoListAsync} from '../../store/photoList/photoListActions';
import Layout from '../Layout';
import {photoListSlice} from '../../store/photoList/photoListSlice';
import {Outlet} from 'react-router-dom';
import {MainPicListItem} from '../MainPicListItem/MainPicListItem';
import Preloader from '../../UI/Preloader';
import {PICTURES_PER_PAGE} from '../../store/photoList/photoListUtils';

// const doAutoLoad = true;

export function MainPicList(props) {
  const dispatch = useDispatch();
  const {loading, error, photoList, page} = useSelector(state => state.photoListReducer);
  const userInfo = useSelector(state => state.authReducer.userInfo);
  const access_token = useSelector(state => state.authReducer.access_token);
  // console.log('access_token: ', access_token);
  const logIn = !!userInfo?.name;
  const endList = useRef(null);
  const [autoLoad, setAutoLoad] = useState(false);

  const handleAutoLoadChange = () => {
    setAutoLoad(prev => !prev);
  };

  const c = endList.current;
  useEffect(() => {
    let observer = undefined;
    if (!loading && !error) {
      // console.log('page: ', page);
      observer = new IntersectionObserver((entries) => {
        // console.log('entries[0].isIntersecting: ', entries[0].isIntersecting);
        if (entries[0].isIntersecting) {
          const nn = page + 1;
          // debugger;
          dispatch(photoListAsync(nn));
        }
      }, {rootMargin: '100px'});

      if (autoLoad) {
        if (c) {
          observer.observe(c);
          return () => {
            observer.unobserve(c);
          };
        } else {
          console.log('11111111111 photoListAsync: ');
          dispatch(photoListAsync(1));
          // setTimeout(() => {
          //   debugger;
          //   dispatch(photoListAsync(1));
          // }, 1000);
        }
      } 
      else {
        console.log('22222222222222 photoListAsync: ');
        // dispatch(photoListAsync(1));
        if (page === 0) {
          setTimeout(() => {
            dispatch(photoListAsync(1));
          }, 0);
        }
      }
    }
  }, [page, access_token, loading, error, dispatch, autoLoad, c]);


  return (
    <main className={_.MainPicList}>
      <Layout>
        <section className={_.listControl}>
          <button
            onClick={() => {
              dispatch(photoListSlice.actions.photoListClear());
            }}
          >clear</button>

          <button
            onClick={() => {
              dispatch(photoListAsync(page + 1));
            }}
          >load next {PICTURES_PER_PAGE}</button>

          <label><input type='checkbox' onChange={handleAutoLoadChange}></input> авто загрузка</label>
        </section>

        <section className={_.content}>
          <h1>Photo List (загружено страниц: {page})</h1>

          <ul>
            {photoList.length === 0 && <li className={_.emptyList}>нет фотографий</li>}
            {photoList.length !== 0 && <>
              {photoList.map((el) => {

                return <MainPicListItem key={el.id} logIn={logIn} el={el} add={'pic'} />;

              })}
            </>}

            <li className={_.transparent} key="999991"></li>
            <li className={_.transparent} key="999992"></li>
            <li className={_.transparent} key="999993"></li>
            <li className={_.transparent} key="999994"></li>
            {error && <li key="999997" className={_.error}>{error}</li>}
            {loading > 0 && <li key="999998" className={_.waitIndicator}><Preloader /></li>}
            {autoLoad && <li ref={endList} key="999999" className={_.autoLoader}></li>}
          </ul>

        </section>
      </Layout>
      <Outlet />
    </main>
  );
}
