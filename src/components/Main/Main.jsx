import {Outlet} from "react-router-dom";
import {MainHeader} from "../MainHeader/MainHeader";
import {MainPicList} from "../MainPicList/MainPicList";

export function Main(props) {

  return (
    <>
      <MainHeader />
      <MainPicList />
      <Outlet/>
    </>
  );
}
