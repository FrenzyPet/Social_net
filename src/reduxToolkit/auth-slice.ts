import { createSlice } from "@reduxjs/toolkit";
import { authAPI, securityAPI } from "../api/api";
import { AppDispatch } from "../hooks/typedHooks";

type AuthSliceState = {
  userID: number | null
  login: string | null
  email: string | null
  isAuth: boolean
  captchaUrl: string
}

type PayloadLoginType = {
  userID: number | null
  login: string | null
  email: string | null
  isAuth: boolean
}

type SetUserLoginActionType = {
  type: string
  payload: PayloadLoginType
}

type SetCaptchaUrlActionType = {
  type: string
  payload: string
}

const initialState: AuthSliceState = {
  userID: null,
  login: null,
  email: null,
  isAuth: false,
  captchaUrl: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserLogin: (state, action: SetUserLoginActionType) => {
      state.userID = action.payload.userID
      state.login = action.payload.login
      state.email = action.payload.email
      state.isAuth = action.payload.isAuth
    },
    setCaptchaUrl: (state, action: SetCaptchaUrlActionType) => {
      state.captchaUrl = action.payload
    }
  }
})

export const { setUserLogin, setCaptchaUrl } = authSlice.actions

export const getUserLogin = () => async (dispatch: AppDispatch) => {
  const data = await authAPI.startAuthentify();
  if (data.resultCode === 0) {
    const { id: userID, login, email } = data.data;
    const payload = {userID, login, email, isAuth: true}
    dispatch(setUserLogin(payload));
  }
}

export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string, setError: any) => async (dispatch: AppDispatch) => {
  const response = await authAPI.login(email, password, rememberMe, captcha)
    switch (response.data.resultCode) {
      case 0:
        dispatch(getUserLogin())
        dispatch(setCaptchaUrl(''))
        break
      case 10:
        dispatch(getCaptcha())
        setError('root.serverError', { 
          type: response.data.resultCode,
          message: response.data.messages[0]
        })
        break
      case 1:
        setError('root.serverError', { 
          type: response.data.resultCode,
          message: response.data.messages[0]
        })
        break
      default:
        break
    }
}

export const logOut = () => async (dispatch: AppDispatch) => {
  const response = await authAPI.logout()
  if (response.data.resultCode === 0) {
      const payload: PayloadLoginType  = {userID: null, login: null, email: null, isAuth: false}
      dispatch(setUserLogin(payload))
    }
}

export const getCaptcha = () => async (dispatch: AppDispatch) => {
  const response = await securityAPI.getCaptchaUrl()
  dispatch(setCaptchaUrl(response.data.url))
}

export default authSlice.reducer;