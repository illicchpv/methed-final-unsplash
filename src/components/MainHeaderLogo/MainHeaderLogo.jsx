import {Link} from 'react-router-dom';
import style from './MainHeaderLogo.module.css';
import logoImg from './img/logo.svg';

export function MainHeaderLogo() {

  return (<>
    <Link className={style.link} to='/'>
      <img className={style.link} src={logoImg} alt='logo final' />
    </Link>
  </>);
}