import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseCodes, usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { AppDispatch } from "../hooks/typedHooks";

export type UsersSliceState = {
  usersData: Array<UserType>
  pageSize: number
  totalCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
  filter: { term: string }
}

type PayloadToogleType = {
  isFetching: boolean
  userID: number
}

const initialState: UsersSliceState = {
  usersData: [],
  pageSize: 5,
  totalCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
  filter: { term: '' }
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    followUser: (state, action: PayloadAction<number>) => {
      state.usersData = state.usersData.map(user => {
        if (user.id === action.payload) {
          return {...user, followed: true}
        }
        return user;
      })
    },
    unfollowUser: (state, action: PayloadAction<number>) => {
      state.usersData = state.usersData.map(user => {
        if (user.id === action.payload) {
          return {...user, followed: false}
        }
        return user;
      })
    },
    setUsers: (state, action: PayloadAction<Array<UserType>>) => {
      state.usersData = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setTotalUsersCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter.term = action.payload
    },
    toggleFollowingProgress: (state, action: PayloadAction<PayloadToogleType>) => {
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
  toggleFollowingProgress,
  setFilter } = usersSlice.actions

export const requestUsers = (currentPage: number, pageSize: number, term: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsFetching(true))
  dispatch(setCurrentPage(currentPage))
  dispatch(setFilter(term))
  const response = await usersAPI.getUsers(currentPage, pageSize, term)
  dispatch(setIsFetching(false))
  dispatch(setUsers(response.items))
  dispatch(setTotalUsersCount(response.totalCount))
}

export const unfollowThunk = (userID: number) => async (dispatch: AppDispatch) => {
  dispatch(toggleFollowingProgress({ isFetching: true, userID }))
  const response = await usersAPI.unfollowUser(userID)
  if (response.resultCode === ResponseCodes.Succses) {
    dispatch(unfollowUser(userID))
  }
  dispatch(toggleFollowingProgress({ isFetching: false, userID }))
}

export const followThunk = (userID: number) => async (dispatch: AppDispatch) => {
  dispatch(toggleFollowingProgress({ isFetching: true, userID }))
  const response = await usersAPI.followUser(userID)
  if (response.resultCode === ResponseCodes.Succses) {
    dispatch(followUser(userID))
  }
  dispatch(toggleFollowingProgress({ isFetching: false, userID }))
}

export default usersSlice.reducer;