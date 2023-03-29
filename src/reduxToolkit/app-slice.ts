import { createSlice } from "@reduxjs/toolkit";
import { getUserLogin } from "./auth-slice";
import { AppDispatch } from "./store";

type InitialStateType = {
  isInit: boolean
}

const initialState: InitialStateType = {
  isInit: false
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initialize: (state) => {
      state.isInit = true
    },
  }
})

export const { initialize } = appSlice.actions

export const initializeApp = () => (dispatch: AppDispatch) => {
  const promise = dispatch(getUserLogin())
  promise.then(() => dispatch(initialize()))
}

export default appSlice.reducer;