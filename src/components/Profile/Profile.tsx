import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { FC } from 'react';
import * as React from 'react';

const Profile: FC = () => {
  return (
    <section className={classes.profile}>
      <ProfileInfo/>
      <MyPosts/>
    </section>
  )
}

export default Profile;

