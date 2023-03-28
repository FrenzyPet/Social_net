import classes from './MyFriends.module.css';
import Friend from './Friend/Friend';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { requestFriends } from '../../reduxToolkit/friends-slice';

const MyFriends = () => {
  const friendsData = useSelector(state => state.friendsPage.friendsData)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestFriends())
  }, [dispatch])

  useEffect(() => {
  }, [friendsData])

  const friendsElements = friendsData.map( (item) => (<Friend id={item.id} name={item.name} photos={item.photos} key={item.id}/>));

  return (
    <section className={classes.friends}>
      <h2 className={classes.friends__title}>My friends</h2>
      <ul className={classes.friends__list}>
        { friendsElements }
      </ul>
    </section>
  )
}

export default MyFriends;