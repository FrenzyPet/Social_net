import { createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";

const initialState = {
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
    followUser: (state, action) => {
      state.usersData = state.usersData.map(user => {
        if (user.id === action.payload) {
          return {...user, followed: true}
        }
        return user;
      })
    },
    unfollowUser: (state, action) => {
      state.usersData = state.usersData.map(user => {
        if (user.id === action.payload) {
          return {...user, followed: false}
        }
        return user;
      })
    },
    setUsers: (state, action) => {
      state.usersData = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setTotalUsersCount: (state, action) => {
      state.totalCount = action.payload
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload
    },
    toggleFollowingProgress: (state, action) => {
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

export const requestUsers = (currentPage, pageSize) => async (dispatch) => { /* Thunk */
  dispatch(setIsFetching(true))
  const data = await usersAPI.getUsers(currentPage, pageSize)
  dispatch(setIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(setTotalUsersCount(data.totalCount));
}

export const changePage = (pageNumber, pageSize) => async (dispatch) => { /* Thunk */
  dispatch(setCurrentPage(pageNumber));
  dispatch(setIsFetching(true))
  const data = await usersAPI.getUsers(pageNumber, pageSize)
  dispatch(setIsFetching(false));
  dispatch(setUsers(data.items));
}

export const unfollowThunk = (userID) => async (dispatch) => {
  dispatch(toggleFollowingProgress(true, userID))
  const data = await usersAPI.unfollowUser(userID)
  if (data.resultCode === 0) {
    dispatch(unfollowUser(userID))
  }
  dispatch(toggleFollowingProgress(false, userID))
}

export const followThunk = (userID) => async (dispatch) => {
  dispatch(toggleFollowingProgress(true, userID))
  const data = await usersAPI.followUser(userID)
  if (data.resultCode === 0) {
    dispatch(followUser(userID))
  }
  dispatch(toggleFollowingProgress(false, userID))
}

export default usersSlice.reducer;