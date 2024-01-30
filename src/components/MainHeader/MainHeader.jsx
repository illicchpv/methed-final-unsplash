import _ from './MainHeader.module.css';
import {MainHeaderAuth} from '../MainHeaderAuth/MainHeaderAuth';
import {MainHeaderLogo} from '../MainHeaderLogo/MainHeaderLogo';
import {MainHeaderSearch} from '../MainHeaderSearch/MainHeaderSearch';
import Layout from '../Layout'

export function MainHeader(props) {

  return (
    <header className={_.header}>
      <Layout>
        <div className={_.gridContainer}>
          <MainHeaderLogo />
          <MainHeaderSearch />
          <MainHeaderAuth />
        </div>
      </Layout>
    </header>
  );
}
