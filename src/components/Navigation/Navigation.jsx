import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css'

const Navigation = () => {
  return (
    <nav className={classes.navigation}>
      <ul className={classes.navigation__list}>
        <li className={classes.navigation__item}>
          <NavLink className={({ isActive }) => isActive ? classes.navigation__link + ' ' + classes.active : classes.navigation__link} to='/profile/'>Profile</NavLink>
        </li>
        <li className={classes.navigation__item}>
          <NavLink className={({ isActive }) => isActive ? classes.navigation__link + ' ' + classes.active : classes.navigation__link} to='/dialogs'>Messages</NavLink>
        </li>
        <li className={classes.navigation__item}>
          <NavLink className={({ isActive }) => isActive ? classes.navigation__link + ' ' + classes.active : classes.navigation__link} to='/news'>News</NavLink>
        </li>
        <li className={classes.navigation__item}>
          <NavLink className={({ isActive }) => isActive ? classes.navigation__link + ' ' + classes.active : classes.navigation__link} to='/music'>Music</NavLink>
        </li>
        <li className={classes.navigation__item}>
          <NavLink className={({ isActive }) => isActive ? classes.navigation__link + ' ' + classes.active : classes.navigation__link} to='/settings'>Settings</NavLink>
        </li>
        <li className={classes.navigation__item}>
          <NavLink className={({ isActive }) => isActive ? classes.navigation__link + ' ' + classes.active : classes.navigation__link} to='/users'>Users</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation;

