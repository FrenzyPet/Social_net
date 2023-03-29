import classes from './Post.module.css';
import defaultAvatar from '../../../../assets/images/user-avatar.png';
import { FC } from 'react';
import * as React from 'react';
import { useTypedSelector } from '../../../../hooks/typedHooks';
import { PostType } from '../../../../types/types';

const Post: FC<PostType> = (props) => {

  const profile = useTypedSelector(state => state.profilePage.profile)
  const avatar = profile ? profile.photos.small : null

  return (
    <li className={classes.item}>
      <div className={classes.item__avatarWrapper}>
        <img className={classes.item__avatarImage} src={avatar || defaultAvatar} alt='img'></img>
      </div>
      <p className={classes.item__text}>{props.message}</p>
      <p className={classes.item__likes}>Likes: {props.likesCount}</p>
    </li>
  )
}

export default Post;

