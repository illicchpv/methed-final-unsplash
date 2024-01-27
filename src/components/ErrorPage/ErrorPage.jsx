import {Link} from "react-router-dom";

export function ErrorPage(props) {

  return (
    <>
      <div>Нет такой страницы.</div>
      <Link to="/" >Перейти на главную</Link>
    </>
  );
}
