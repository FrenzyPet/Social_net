import { FC } from 'react';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { logOut } from '../../reduxToolkit/auth-slice';
import classes from './Header.module.css';
import { useAppDispatch, useTypedSelector } from '../../hooks/typedHooks'

const Header: FC = () => {
  const { isAuth, login } = useTypedSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const onLogout = () => {
    dispatch(logOut())
  }

  return (
    <header className={classes.header}>
      <div className={classes.logoContainer}>
        <img className={classes.logo} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Wikimedia-logo.png/600px-Wikimedia-logo.png" width="70" height="70" alt='Логотип.'></img>
        <h1 className={classes.title}>FrenzyPulse</h1>
      </div>
      <div className={classes.userMenu}>
        { isAuth
            ? <div className={classes.login__wrapper}>
                <span className={classes.login}>{login}</span>
                <button className={classes.button} onClick={onLogout} type='button'>Logout</button>
              </div>
            : <NavLink className={classes.button} to='/login'>Login</NavLink>
        }
      </div>
    </header>
  )
}

export default Header;

