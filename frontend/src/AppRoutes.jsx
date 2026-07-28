import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router'
import Registration from './features/auth/pages/Registration'
import Login from './features/auth/pages/Login'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/registration' element={<Registration/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes