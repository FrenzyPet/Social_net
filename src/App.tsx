import { useEffect } from 'react'
import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { initializeApp } from './reduxToolkit/app-slice'
import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import MyFriends from './components/MyFriends/MyFriends'
import Preloader from './components/common/Preloader/Preloader'
import CheckAuth from './components/Layout/CheckAuth'
import Profile from './components/Profile/Profile'
import Dialogs from './components/Dialogs/Dialogs'
import News from './components/News/News'
import Settings from './components/Settings/Settings'
import Users from './components/Users/Users'
import Login from './components/Login/Login'
import Music from './components/Music/Music'
import { useAppDispatch, useTypedSelector } from './hooks/typedHooks'
import './App.css'
import ChatPage from './pages/Chat/ChatPage'

const App: React.FC = () => {
  const isInit = useTypedSelector(state => state.app.isInit)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch])

  if (!isInit) {
    return <Preloader />
  }

  return (
    <div className="wrapper">
      <Header />
      <Navigation />
      <MyFriends />
      <Routes>
        <Route element={<CheckAuth />}>
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/profile/:userID?" element={<Profile />} />
          <Route path="/dialogs/*" element={<Dialogs />} />
          <Route path="/news" element={<News />} />
          <Route path="/music" element={<Music />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/users" element={<Users />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
