import { FC, KeyboardEventHandler, useEffect } from 'react';
import * as React from 'react';
import { requestUsers, followThunk, unfollowThunk } from "../../reduxToolkit/users-slice";
import { deleteFriend, addFriend } from '../../reduxToolkit/friends-slice';
import style from './Users.module.css';
import User from './User/User';
import Preloader from "../common/Preloader/Preloader";
import Pagination from '../common/Pagination/Pagination';
import { useAppDispatch, useTypedSelector } from '../../hooks/typedHooks'
import { useForm, SubmitHandler } from 'react-hook-form';
// import { Controller } from 'react-hook-form';


const Users: FC = () => {
  const { 
    usersData,
    pageSize,
    totalCount, 
    currentPage, 
    isFetching, 
    followingInProgress,
    filter,
  } = useTypedSelector((state) => state.usersPage)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter.term))
  }, [dispatch, currentPage, pageSize, filter.term]);  

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter.term))
  }

  const onFollow = (userID: number) => {
    dispatch(followThunk(userID))
    dispatch(addFriend(usersData.find( item => item.id === userID)))
  }
  
  const onUnfollow = (userID: number) => {
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
      <SearchForm pageSize={pageSize}
                  currentPage={currentPage}/>
      <ul className={style.users__list}>
        { usersElement }
      </ul>
    </div>
  </>
  )

}

interface PropsType {
  currentPage: number
  pageSize: number
}

const SearchForm: FC<PropsType> = ({ currentPage, pageSize }) => {
  interface SearchFormValues {
    term: string
  }

  const { handleSubmit, register } = useForm<SearchFormValues>()
  const dispatch = useAppDispatch()
  
  const onSubmit: SubmitHandler<SearchFormValues> = ({ term }) => {
    dispatch(requestUsers(currentPage, pageSize, term))
  }
  
  const onSubmitByEnter: KeyboardEventHandler<HTMLInputElement> = (evt) => {
    if (evt.key === 'Enter') {
      handleSubmit(onSubmit)
    }
  }

  return (
    <form className={ style.users__form } onSubmit={ handleSubmit(onSubmit) }>
        <input
          {...register("term", { required: true })}
          onKeyDown={ onSubmitByEnter }
          className={ style.form__input }
          type="text"
          placeholder="Введите имя пользователя"
        />

        {/* <Controller
          render={({ field }) => <input {...field} className={ style.form__input } />}
          name="term"
          control={control}
          defaultValue=""
        /> */}
        <button className={ style.form__button } type='submit'>Найти</button>
    </form>
  )

}

export default Users;