import { createSlice } from "@reduxjs/toolkit";
import { getUserLogin } from "./auth-slice";

const initialState = {
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

export const initializeApp = () => (dispatch) => {
  const promise = dispatch(getUserLogin())
  promise.then(() => dispatch(initialize()))
}

export default appSlice.reducer;