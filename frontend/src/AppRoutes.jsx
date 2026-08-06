import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router'
import Registration from './features/auth/pages/Registration'
import Login from './features/auth/pages/Login'
import Feed from './features/posts/feed/Feed'
import { CreateThePost } from './features/posts/components/createPost/CreatePost'
import Profile from './features/profile/Profile'

const AppRoutes = () => {
  return (
    
        <Routes>
            <Route path='/' element={<Feed/>}></Route>
            <Route path='/registration' element={<Registration/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/create' element={<CreateThePost/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
        </Routes>
    
  )
}

export default AppRoutes