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
  followingInProgress: []
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
  toggleFollowingProgress } = usersSlice.actions

export const requestUsers = (currentPage: number, pageSize: number) => async (dispatch: AppDispatch) => { /* Thunk */
  dispatch(setIsFetching(true))
  const response = await usersAPI.getUsers(currentPage, pageSize)
  dispatch(setIsFetching(false));
  dispatch(setUsers(response.items));
  dispatch(setTotalUsersCount(response.totalCount));
}

export const changePage = (pageNumber: number, pageSize: number) => async (dispatch: AppDispatch) => { /* Thunk */
  dispatch(setCurrentPage(pageNumber));
  dispatch(setIsFetching(true))
  const response = await usersAPI.getUsers(pageNumber, pageSize)
  dispatch(setIsFetching(false));
  dispatch(setUsers(response.items));
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

export const searchUsers = (term: string, isFriend = false) => async (dispatch: AppDispatch) => {
  dispatch(setIsFetching(true))
  const response = await usersAPI.searchUsers(term, isFriend)
  dispatch(setIsFetching(false));
  dispatch(setUsers(response.items));
}

export default usersSlice.reducer;