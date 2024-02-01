import {useDispatch} from 'react-redux';
import {handleDoAuth} from '../../store/auth/authUtils';
import formatDate from '../../utils/formatDate';
import _ from './MainPicListItem.module.css';
import {Link, useLocation, useParams} from "react-router-dom";
import {photoItemBadAsync, photoItemLikeAsync} from '../../store/photoItem/photoItemActions';

export function MainPicListItem(props) {
  let {logIn, el} = props;
  let location = useLocation();
  const dispatch = useDispatch();

  const handleLogin = (add) => {
    const st = window.confirm('Вам нужно войти, чтобы иметь возможность лайкать. Ок?');
    if (st) handleDoAuth(add);
  };
  const handleLike = (id) => {
    dispatch(photoItemLikeAsync(id));
  };
  const handleBad = (id) => {
    dispatch(photoItemBadAsync(id));
  };
  
  // console.log('location.pathname: ', location.pathname);

  return (
    <li className={_.MainPicListItem}>
      <div className={_.imgBox}>

        <Link to={location.pathname + props.add + "/" + el.id}
          title={'фото сделано ' + formatDate(el.created_at)}
        ><img className={_.listImg} src={el.urls.thumb} alt={el.alt_description} /></Link>

        <span className={_.likeBox}>
          {logIn &&
            <button className={_.likes + ' ' + (el.liked_by_user && _.likeActive)}
              title={'всего ' + el.likes + ' лаек. Вы можете отметить это фото'}
              onClick={() => {!el.liked_by_user ? handleLike(el.id) : handleBad(el.id);}}
            ></button>
          }
          {!logIn &&
            <button className={_.likes + ' ' + (el.liked_by_user && _.likeActive)}
              title={'всего ' + el.likes + ' лаек. Вы можете поставить/снять свой лайк после авторизации'}
              onClick={() => {handleLogin(el.id);}}
            ></button>
          }
          {/* <button className={_.confirmLogin}>login?</button> */}
          <span className={_.likeCount}>{el.likes}</span>
        </span>

        <h2>
          <a href={el.user.portfolio_url} target="_blank" rel="noreferrer"
            title={el.user.portfolio_url && "перейти на portfolio автора"}
          >
            <img className={_.authPhoto} src={el.user.profile_image} alt="" />
          </a>
          <span title={'проживает в: ' + el.user.location}>{el.user.username}</span>
        </h2>

        <h3 title={"описание фото:\r\n" +
          el.description
        }>{el.description}</h3>

      </div>

    </li>
  );
}
