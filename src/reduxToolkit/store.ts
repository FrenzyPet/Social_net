import { configureStore } from "@reduxjs/toolkit";
import appReducer from './app-slice';
import authReducer from './auth-slice';
import friendsReducer from './friends-slice';
import messagesReducer from './messages-slice';
import profileReducer from './profile-slice';
import usersReducer from './users-slice';

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    friendsPage: friendsReducer,
    messagesPage: messagesReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>

export default store;