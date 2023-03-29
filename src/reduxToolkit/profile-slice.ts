import { createSlice } from "@reduxjs/toolkit";
import { profileAPI } from "../api/api";
import { ProfileType, PhotosType } from "../types/types";

type PostType = {
  id: number
  message: string
  likeCount: number
}

type InitialStateType = {
  postsData: Array<PostType>
  profile: ProfileType
  status: string
}

type AddPostActiontype = {
  type: string
  payload: string
}

type SetUserProfileActiontype = {
  type: string
  payload: ProfileType
}

type SetUserStatusActiontype = {
  type: string
  payload: string
}

type SetPhotoActiontype = {
  type: string
  payload: PhotosType
}

const initialState: InitialStateType  = {
  postsData: [
    { message: 'Hello, my name Artem.', id: 1, likeCount: 10},
    { message: 'I am junior react developer.', id: 2, likeCount: 20},
    { message: 'Its my social network developed with using react, redux toolkit, react-router-dom, axios, react-hook-form.', id: 3, likeCount: 30}
  ],
  profile: null,
  status: ''
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addPost: (state, action: AddPostActiontype) => {
      const newPost: PostType = {
        message: action.payload,
        id: state.postsData.length + 1,
        likeCount: 0
      }
      state.postsData.push(newPost)
    },
    setUserProfile: (state, action: SetUserProfileActiontype) => {
      state.profile = action.payload
    },
    setUserStatus: (state, action: SetUserStatusActiontype) => {
      state.status = action.payload
    },
    setPhoto: (state, action: SetPhotoActiontype) => {
      state.profile.photos = action.payload
    },
  }
})

export const { addPost, setUserProfile, setUserStatus, setPhoto } = profileSlice.actions

export const getUserProfile = (userID: number) => async (dispatch: any) => {
  const data = await profileAPI.getUserProfile(userID)
  dispatch(setUserProfile(data))
}

export const getStatus = (userID: number) => async (dispatch: any) => {
  const response = await profileAPI.getStatus(userID)
  dispatch(setUserStatus(response.data))
}

export const updateStatus = (statusText: string) => async (dispatch: any) => {
  const response = await profileAPI.updateStatus(statusText)
  if (response.data.resultCode === 0) {
    dispatch(setUserStatus(statusText))
  }
}

export const updatePhoto = (file: File) => async (dispatch: any) => {
  const response = await profileAPI.updatePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(setPhoto(response.data.data.photos))
  }
}

export const updateProfile = (profile: ProfileType, setError: any) => async (dispatch: any, getState: any) => {
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