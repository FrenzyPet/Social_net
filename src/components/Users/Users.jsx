import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestUsers, changePage, followThunk, unfollowThunk } from "../../reduxToolkit/users-slice";
import { deleteFriend, addFriend } from '../../reduxToolkit/friends-slice';
import style from './Users.module.css';
import User from './User/User';
import Preloader from "../common/Preloader/Preloader";
import Pagination from '../common/Pagination/Pagination';

const Users = () => {
  const { 
    usersData,
    pageSize,
    totalCount, 
    currentPage, 
    isFetching, 
    followingInProgress
  } = useSelector(state => state.usersPage)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize))
  }, [dispatch, currentPage, pageSize]);  

  const onPageChanged = (pageNumber) => {
    dispatch(changePage(pageNumber, pageSize))
  }

  const onFollow = (userID) => {
    dispatch(followThunk(userID))
    dispatch(addFriend(usersData.find( item => item.id === userID)))
  }
  
  const onUnfollow = (userID) => {
    dispatch(unfollowThunk(userID))
    dispatch(deleteFriend(userID))
  }

  const usersElement = usersData.map(item => (
        <User
          key={item.id}
          id={item.id}
          name={item.name}
          photos={item.photos}
          status={item.status}
          followed={item.followed}
          followingInProgress={followingInProgress}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
          />
      ))

  return (<>
    {isFetching ? <Preloader/> : null}
    <div className={style.users}>
      <Pagination totalCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChanged={onPageChanged}
      />
      <form className={style.users__form} action="">
        <input className={style.form__input} type="text" placeholder="Введите имя пользователя"/>
        <button className={style.form__button} type='submit'>Найти друзей</button>
      </form>
      <ul className={style.users__list}>
        { usersElement }
      </ul>
    </div>
  </>
  )

}

export default Users;