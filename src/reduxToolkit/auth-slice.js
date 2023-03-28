import { createSlice } from "@reduxjs/toolkit";
import { authAPI, securityAPI } from "../api/api";

const initialState = {
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
    setUserLogin: (state, action) => {
      state.userID = action.payload.id
      state.login = action.payload.login
      state.email = action.payload.email
      state.isAuth = action.payload.isAuth
    },
    setCaptchaUrl: (state, action) => {
      state.captchaUrl = action.payload
    }
  }
})

export const { setUserLogin, setCaptchaUrl } = authSlice.actions

export const getUserLogin = () => async (dispatch) => {
  const data = await authAPI.startAuthentify();
  if (data.resultCode === 0) {
    const { id, login, email } = data.data;
    const payload = {id, login, email, isAuth: true}
    dispatch(setUserLogin(payload));
  }
}

export const logIn = (email, password, rememberMe, captcha, setError) => async (dispatch) => {
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

export const logOut = () => async (dispatch) => {
  const response = await authAPI.logout()
  if (response.data.resultCode === 0) {
      const payload = {id: null, login: null, email: null, isAuth: false}
      dispatch(setUserLogin(payload))
    }
}

export const getCaptcha = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl()
  dispatch(setCaptchaUrl(response.data.url))
}

export default authSlice.reducer;