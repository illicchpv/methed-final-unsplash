import _ from './TestsHelper.module.css';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import homeImg from '../../img/favIcon3.svg';

export function TestsHelper(props) {
  const navigate = useNavigate();
  let location = useLocation();
  const pages = props.pages;
  // console.log('pages: ', pages);

  return (
    <div className={_.TestsHelper}>
      <div className={_.line}>
        <Link to="/" >
          <img className={_.home} height={32} width={32} src={homeImg} alt='home page logo' />
        </Link>
        <span>Tests:</span>
        {pages.map((el) => {
          return <span key={el}>
            <button type='button'
              className={location.pathname === el ? _.selected : ''}
              onClick={() => {navigate(el);}}
            >{el.replaceAll('/', ' ')}</button>
          </span>;
        })}
      </div>
    </div>
  );
}
