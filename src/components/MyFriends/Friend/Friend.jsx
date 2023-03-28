import classes from './Friend.module.css';
import avatar from '../../../assets/images/user-avatar.png';
import { NavLink } from 'react-router-dom';

const Friend = (props) => {
  const name = props.name.length > 8 ? `${props.name.slice(0, 8)}...` : props.name
  return (
    <li className={classes.friends__item}>
      <NavLink to={'/profile/' + props.id}>
        <img className={classes.friends__avatar} src={props.photos.small || avatar} width="50" height="50" alt="Аватарка." />
      </NavLink>
      <p className={classes.friends__name}>{name}</p>
    </li>
  )
}

export default Friend;