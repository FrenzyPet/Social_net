import { createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { AppDispatch } from "./store";

type InitialStateType = {
  friendsData: Array<UserType>
}

type SetFriendsActionType = {
  type: string
  payload: Array<UserType>
}

type AddFriendActionType = {
  type: string
  payload: UserType
}

type DeleteFriendActionType = {
  type: string
  payload: number
}

const initialState: InitialStateType = {
  friendsData: []
}

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends: (state, action: SetFriendsActionType) => {
      state.friendsData = state.friendsData.concat(action.payload)
    },
    addFriend: (state, action: AddFriendActionType) => {
      state.friendsData.push(action.payload)
    },
    deleteFriend: (state, action: DeleteFriendActionType) => {
      state.friendsData = state.friendsData.filter(item => item.id !== action.payload)
    },
  }
})

export const { setFriends, addFriend, deleteFriend } = friendsSlice.actions

export const requestFriends = () => async (dispatch: AppDispatch) => { 
  const data = await usersAPI.getUsers(1, 20);
  dispatch(setFriends(data.items.filter((item: UserType) => item.followed)));
}

export default friendsSlice.reducer;