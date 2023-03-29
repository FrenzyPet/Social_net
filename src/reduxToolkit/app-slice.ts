import { createSlice } from "@reduxjs/toolkit";
import { getUserLogin } from "./auth-slice";
import { AppDispatch } from "../hooks/typedHooks";

type AppSliceState = {
  isInit: boolean
}

const initialState: AppSliceState = {
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