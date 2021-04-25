import { Link, Route, Switch } from 'react-router-dom';
import logoImage from '../images/header/logo.svg';

function Header({ email, onSignOut }) {

  function signOut(){

    onSignOut();
  }


  return (
    <>
      <header className='header'>
        <img src={logoImage} alt="Логотип сайта 'Место'" className='header__logo' />

        <ul className='header__menu'>

          <Switch>

            <Route path='/sign-up'>
              <li className='header__item'>
                <Link className="header__link" to='/sign-in'>Войти</Link>
              </li>
            </Route>

            <Route path='/sign-in'>
              <li className='header__item'>
                <Link className="header__link" to='/sign-up' >Регистрация</Link>
              </li>
            </Route>

            <Route path='/' exact >
              <li className='header__email' >{ email }</li>
              <li className='header__item' onClick={ onSignOut }>
                <Link onClick = {signOut} className="header__link" to="/sign-in">Выйти</Link>
              </li>
            </Route>

          </Switch>

        </ul>

      </header>
    </>
  )
};

export default Header;
