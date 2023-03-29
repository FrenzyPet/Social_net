import { FC } from 'react';
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { logIn } from '../../reduxToolkit/auth-slice';
import style from './Login.module.css';
import { useAppDispatch, useTypedSelector } from '../../hooks/typedHooks'

const Login: FC = () => {
  const isAuth = useTypedSelector(state => state.auth.isAuth)

  if (isAuth) {
    return <Navigate to="/profile"/>
  }

  return (
    <div className={style.login}>
      <h1 className={style.login__header}>Вход в FrenzyPulse</h1>
      <LoginForm/>
    </div>
  )
}

const LoginForm: FC = () => {
  const dispatch = useAppDispatch()
  const { register, handleSubmit, setError, formState: { errors } } = useForm()
  const captchaUrl = useTypedSelector(state => state.auth.captchaUrl)

  interface FormData {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
  }

  const onSubmit = ({ email, password, rememberMe, captcha } : FormData) => {
    dispatch(logIn(email, password, rememberMe, captcha, setError))
  }

  return (
    <form className={style.login__form} onSubmit={handleSubmit(onSubmit)}>
      <label className={style.form__label}>
        <input
          {...register('email', {required : "Назови себя, странник интернета"})}
          type="email"
          className={style.form__input}
          placeholder="Введите email"
        />
        {errors.email && <span className={style.error}>Назови себя, странник интернета</span>}
      </label>
      <label className={style.form__label}>
        <input
          {...register('password', {required : "Предъявите пароль, уважаемый"})}
          type="password"
          className={style.form__input}
          placeholder="Введите пароль"
        />
        {errors.password && <span className={style.error}>Предъявите пароль, уважаемый</span>}
      </label>
      <label className={style.form__label + ' ' + style.form__label__checkbox}>
        <input {...register('rememberMe')} type="checkbox" className={style.form__input__checkbox}/>
        <span className={style.checkbox__mark}></span>
        <span className={style.checkbox__text}>запомнить меня</span>
      </label>
      { captchaUrl &&
        <label className={style.form__label__captcha}>
          <img className={style.captchaImage} src={captchaUrl} alt="captcha" />
          <input
            {...register('captcha', {required : "Без каптчи не войдешь, сорян"})}
            type="password"
            className={style.form__input}
            placeholder="Введите captcha"
          />
          {errors.captcha && <span className={style.error}>Без каптчи не войдешь, сорян</span>}
        </label>
      }
      <button className={style.form__button} type="submit">Войти</button>
      {errors.root?.serverError?.message && <div className={style.serverError}>{errors.root?.serverError?.message}</div>}
    </form>
  )
}

export default Login;