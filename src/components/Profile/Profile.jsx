import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = () => {
  return (
    <section className={classes.profile}>
      <ProfileInfo/>
      <MyPosts/>
    </section>
  )
}

export default Profile;

