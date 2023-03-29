import { createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { AppDispatch } from "./store";

export type UsersSliceState = {
  usersData: Array<UserType>
  pageSize: number
  totalCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
}

type FollowUserActionType = {
  type: string
  payload: number
}

type SetUsersActionType = {
  type: string
  payload: Array<UserType>
}

type SetCurrentPageActionType = {
  type: string
  payload: number
}

type SetTotalUsersCountActionType = {
  type: string
  payload: number
}

type SetIsFetchingActionType = {
  type: string
  payload: boolean
}

type PayloadToogleType = {
  isFetching: boolean
  userID: number
}

type ToggleFollowingProgressActionType = {
  type: string
  payload: PayloadToogleType
}

const initialState: UsersSliceState = {
  usersData: [],
  pageSize: 5,
  totalCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: []
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    followUser: (state, action: FollowUserActionType) => {
      state.usersData = state.usersData.map(user => {
        if (user.id === action.payload) {
          return {...user, followed: true}
        }
        return user;
      })
    },
    unfollowUser: (state, action: FollowUserActionType) => {
      state.usersData = state.usersData.map(user => {
        if (user.id === action.payload) {
          return {...user, followed: false}
        }
        return user;
      })
    },
    setUsers: (state, action: SetUsersActionType) => {
      state.usersData = action.payload
    },
    setCurrentPage: (state, action: SetCurrentPageActionType) => {
      state.currentPage = action.payload
    },
    setTotalUsersCount: (state, action: SetTotalUsersCountActionType) => {
      state.totalCount = action.payload
    },
    setIsFetching: (state, action: SetIsFetchingActionType) => {
      state.isFetching = action.payload
    },
    toggleFollowingProgress: (state, action: ToggleFollowingProgressActionType) => {
      state.followingInProgress = action.payload.isFetching
                                    ? [...state.followingInProgress, action.payload.userID]
                                    : state.followingInProgress.filter(item => item !== action.payload.userID)
    },
  }
})

export const {
  followUser,
  unfollowUser,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  setIsFetching,
  toggleFollowingProgress } = usersSlice.actions

export const requestUsers = (currentPage: number, pageSize: number) => async (dispatch: AppDispatch) => { /* Thunk */
  dispatch(setIsFetching(true))
  const data = await usersAPI.getUsers(currentPage, pageSize)
  dispatch(setIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(setTotalUsersCount(data.totalCount));
}

export const changePage = (pageNumber: number, pageSize: number) => async (dispatch: AppDispatch) => { /* Thunk */
  dispatch(setCurrentPage(pageNumber));
  dispatch(setIsFetching(true))
  const data = await usersAPI.getUsers(pageNumber, pageSize)
  dispatch(setIsFetching(false));
  dispatch(setUsers(data.items));
}

export const unfollowThunk = (userID: number) => async (dispatch: AppDispatch) => {
  dispatch(toggleFollowingProgress({ isFetching: true, userID }))
  const data = await usersAPI.unfollowUser(userID)
  if (data.resultCode === 0) {
    dispatch(unfollowUser(userID))
  }
  dispatch(toggleFollowingProgress({ isFetching: false, userID }))
}

export const followThunk = (userID: number) => async (dispatch: AppDispatch) => {
  dispatch(toggleFollowingProgress({ isFetching: true, userID }))
  const data = await usersAPI.followUser(userID)
  if (data.resultCode === 0) {
    dispatch(followUser(userID))
  }
  dispatch(toggleFollowingProgress({ isFetching: false, userID }))
}

export default usersSlice.reducer;