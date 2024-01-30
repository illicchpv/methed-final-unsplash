import {useParams} from 'react-router-dom';
import _ from './MainPicItem.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {photoItemAsync, photoItemBadAsync, photoItemLikeAsync} from '../../store/photoItem/photoItemActions';
import {useEffect} from 'react';
import formatDate from '../../utils/formatDate';
import {handleDoAuth} from '../../store/auth/authUtils';

export function MainPicItem(props) {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {loading, error, photoItem: el} = useSelector(state => state.photoItemReducer);
  const userInfo = useSelector(state => state.authReducer.userInfo);
  const logIn = !!userInfo?.name;
  console.log('userInfo?.name: ', userInfo?.name);

  console.log(`logIn:${logIn} el.liked_by_user: `, el.liked_by_user);

  useEffect(() => {
    dispatch(photoItemAsync(id)); // 
  }, [id, dispatch]);

  const handleSetLike = () => {

    if (!logIn) {
      const st = window.confirm('Вам нужно войти, чтобы иметь возможность лайкать. Ок?');
      if (st) handleDoAuth('');
      return;
    }
    dispatch(photoItemLikeAsync(id));
  };
  const handleDelLike = () => {

    if (!logIn) {
      const st = window.confirm('Вам нужно войти, чтобы иметь возможность лайкать. Ок?');
      if (st) handleDoAuth('');
      return;
    }
    dispatch(photoItemBadAsync(id));
  };

  // debugger;
  return (
    <>
      {
        el.id &&
        <div className={_.MainPicItem}>
          {/* MainPicItem: {el.id} */}
          {/* created_at: {el.created_at}<br/> */}
          {/* description: {el.description}<br/> */}
          {/* alt_description: {el.alt_description}<br/> */}
          {/* likes: {el.likes}<br /> */}
          {/* liked_by_user: {el.liked_by_user ? 'true' : 'false'}<br/> */}
          {/* urls.regular: {el.urls.regular}<br/> */}
          {/* user.id: {el.user.id}<br/> */}
          {/* user.username: {el.user.username}<br /> */}
          {/* user.location: {el.user.location}<br /> */}
          {/* user.portfolio_url: {el.user.portfolio_url}<br /> */}
          {/* user.profile_image: {el.user.profile_image}<br /> */}

          <p className={_.aboutPhoto}>
            Фото сделано пользователем "{el.user.username}"
            в {formatDate(el.created_at)}.
            <br />Получило {el.likes} лайков {el.liked_by_user && 'включая ваш'}.
            {el.liked_by_user && <button
              onClick={handleDelLike}
            >отменить лайк</button>}
            {!el.liked_by_user &&
              <button
                onClick={handleSetLike}
              >поставить лайк</button>}
          </p>

          <a className={_.portFolioBox} href={el.user.portfolio_url} target='_blank' rel="noreferrer">
            <img src={el.user.profile_image_m} alt={"фото автора - " + el.user.username} />
            <span>на портфолио автора {!el.user.portfolio_url && '- отсутствует'}</span>
          </a>
          <span>Место проживания "{el.user.username}" - {el.user.location ?? 'неизвестно'}</span>
          <hr />
          <p>Описание фотографии:</p>
          <p>{el.description}</p>
          <div>
            <img src={el.urls.regular} alt={el.alt_description} />
          </div>
        </div>
      }
    </>
  );
}
