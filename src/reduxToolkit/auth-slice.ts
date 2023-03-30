import { createSlice } from "@reduxjs/toolkit";
import { authAPI, securityAPI, ResponseCodes } from "../api/api";
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
  const response = await authAPI.startAuthentify();
  
  if (response.resultCode === ResponseCodes.Succses) {
    const { id: userID, login, email } = response.data;
    const payload = {userID, login, email, isAuth: true}
    dispatch(setUserLogin(payload));
  }
}

export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string, setError: any) => async (dispatch: AppDispatch) => {
  const response = await authAPI.login(email, password, rememberMe, captcha)
    switch (response.resultCode) {
      case ResponseCodes.Succses:
        dispatch(getUserLogin())
        dispatch(setCaptchaUrl(''))
        break
      case ResponseCodes.Captcha:
        dispatch(getCaptcha())
        setError('root.serverError', { 
          type: response.resultCode,
          message: response.messages[0]
        })
        break
      case ResponseCodes.Error:
        setError('root.serverError', { 
          type: response.resultCode,
          message: response.messages[0]
        })
        break
      default:
        break
    }
}

export const logOut = () => async (dispatch: AppDispatch) => {
  const response = await authAPI.logout()
  if (response.resultCode === ResponseCodes.Succses) {
      const payload: PayloadLoginType  = {userID: null, login: null, email: null, isAuth: false}
      dispatch(setUserLogin(payload))
    }
}

export const getCaptcha = () => async (dispatch: AppDispatch) => {
  const response = await securityAPI.getCaptchaUrl()
  dispatch(setCaptchaUrl(response.url))
}

export default authSlice.reducer;