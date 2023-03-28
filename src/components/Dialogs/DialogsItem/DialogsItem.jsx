import { NavLink } from 'react-router-dom';
import classes from './DialogsItem.module.css';

const DialogItem = (props) => {
  return (
    <div className={classes.dialogs__item}>
      <img className={classes.dialogs__avatar} src="https://media.istockphoto.com/id/1300845620/ru/векторная/пользователь-icon-flat-изолирован-на-белом-фоне-символ-пользователя-иллюстрация-вектора.jpg?s=612x612&w=0&k=20&c=Po5TTi0yw6lM7qz6yay5vUbUBy3kAEWrpQmDaUMWnek=" width="25" height="25" alt="" />
      <NavLink className={classes.dialogs__link} to={`/dialogs/${props.id}`}>{props.name}</NavLink>
    </div>
  )
}

export default DialogItem;