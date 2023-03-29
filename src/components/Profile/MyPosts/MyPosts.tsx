import { useEffect } from 'react';
import { FC } from 'react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { addPost } from '../../../reduxToolkit/profile-slice';
import style from './MyPosts.module.css'
import Post from './Post/Post';
import { useAppDispatch, useTypedSelector } from '../../../hooks/typedHooks';

const MyPosts: FC = () => {
  const postsData = useTypedSelector(state => state.profilePage.postsData)
  const postsElements = postsData.map((item) => (<Post id={item.id} message={item.message} likesCount={item.likesCount} key={item.id} />));

  return (
    <div>
      <NewPostForm/>
      <ul className={style.postsList}>
        {postsElements}
      </ul>
    </div>
  )
}

const NewPostForm: FC = () => {
  const dispatch = useAppDispatch()
  const { handleSubmit, register, reset, formState, formState: { errors } } = useForm({defaultValues: {newPost: ''}});

  const onSubmit = ({ newPost } : { newPost : string }) => {
    dispatch(addPost(newPost));
  }

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ newPost: '' });
    }
  }, [formState, reset]);

  const validateConfig = {
    required: "Ну напиши что-нибудь!",
    minLength: {
      value: 5,
      message: "Маловато будет..."
    },
    maxLength: {
      value: 300,
      message: "Пост не может быть длиннее 300 символов. Краткость - сестра таланта."
    }
  }

  const textareaClasses = [style.textarea]

  if (errors.newPost) {
    textareaClasses.push(style.textarea__error)
  }

  return (
    <form className={style.form} onSubmit={ handleSubmit(onSubmit) }>
      <div className={style.textareaWrapper}>
        <textarea
              {...register('newPost', validateConfig)}
              className={textareaClasses.join(' ')}
              placeholder='Что у Вас нового?'
        />
        {errors.newPost && <span className={style.error}>{errors.newPost.message}</span>}
      </div>
      <button className={style.button} type="submit">Опубликовать</button>
    </form>
  )
}

export default MyPosts;

