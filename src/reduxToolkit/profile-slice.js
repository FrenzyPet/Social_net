import { createSlice } from "@reduxjs/toolkit";
import { profileAPI } from "../api/api";

const initialState = {
  postsData: [
    { message: 'Hello, my name Artem.', id: 1, likeCount: 10},
    { message: 'I am junior react developer.', id: 2, likeCount: 20},
    { message: 'Its my social network developed with using react, redux toolkit, react-router dom, axios, react-hook-form.', id: 3, likeCount: 30}
  ],
  profile: null,
  status: ''
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addPost: (state, action) => {
      const newPost = {
        message: action.payload,
        id: state.postsData.length + 1,
        likeCount: 0
      }
      state.postsData.push(newPost)
    },
    setUserProfile: (state, action) => {
      state.profile = action.payload
    },
    setUserStatus: (state, action) => {
      state.status = action.payload
    },
    setPhoto: (state, action) => {
      state.profile.photos = action.payload
    },
  }
})

export const { addPost, setUserProfile, setUserStatus, setPhoto } = profileSlice.actions

export const getUserProfile = (userID) => async (dispatch) => {
  const data = await profileAPI.getUserProfile(userID)
  dispatch(setUserProfile(data))
}

export const getStatus = (userID) => async (dispatch) => {
  const response = await profileAPI.getStatus(userID)
  dispatch(setUserStatus(response.data))
}

export const updateStatus = (statusText) => async (dispatch) => {
  const response = await profileAPI.updateStatus(statusText)
  if (response.data.resultCode === 0) {
    dispatch(setUserStatus(statusText))
  }
}

export const updatePhoto = (file) => async (dispatch) => {
  const response = await profileAPI.updatePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(setPhoto(response.data.data.photos))
  }
}

export const updateProfile = (profile, setError) => async (dispatch, getState) => {
  const userID = getState().auth.userID
  const response = await profileAPI.updateProfile(profile)
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userID))
  } else {
    setError('root.serverError', { 
      type: response.data.resultCode,
      message: response.data.messages[0]
    })
  }
}

export default profileSlice.reducer;