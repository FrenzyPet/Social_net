import { NavLink } from 'react-router-dom';
import style from './User.module.css';
import avatar from '../../../assets/images/user-avatar.png';

const User = (props) => {
  return (
    <li className={style.userItem}>
      <div className={style.user__view}>
        <NavLink to={'/profile/' + props.id}>
          <img className={style.user__avatar} src={props.photos.small || avatar} alt="avatar" />
        </NavLink>
        { props.followed
            ? (<button className={style.user__button}
                       disabled={props.followingInProgress.some(item => item === props.id)}
                       type='button'
                       onClick={() => props.onUnfollow(props.id)}>Удалить</button>)
            : (<button className={style.user__button}
                       disabled={props.followingInProgress.some(item => item === props.id)}
                       type='button'
                       onClick={() => props.onFollow(props.id)}>Добавить</button>)
        }
      </div>
      <div className={style.user__info}>
        <div className={style.user__personal}>
          <span className={style.user__name}>{props.name}</span>
          <span className={style.user__status}>{props.status}</span>
        </div>
        <div className={style.user__location}>
          <span className={style.user__country}>Country</span>
          <span className={style.user__town}>Town</span>
        </div>
      </div>
    </li>
  )
}

export default User;