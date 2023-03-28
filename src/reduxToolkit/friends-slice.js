import { createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";

const initialState = {
  friendsData: []
}

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friendsData = state.friendsData.concat(action.payload)
    },
    addFriend: (state, action) => {
      state.friendsData.push(action.payload)
    },
    deleteFriend: (state, action) => {
      state.friendsData = state.friendsData.filter(item => item.id !== action.payload)
    },
  }
})

export const { setFriends, addFriend, deleteFriend } = friendsSlice.actions

export const requestFriends = () => async (dispatch) => { 
  const data = await usersAPI.getUsers(1, 20);
  dispatch(setFriends(data.items.filter((item) => item.followed)));
}

export default friendsSlice.reducer;