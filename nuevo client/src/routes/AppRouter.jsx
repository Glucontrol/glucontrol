import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Landing} from "../views/Landing.jsx"
import {Login} from "../views/Login.jsx"
const AppRouter = () => {
    return (
      <BrowserRouter>
          <Routes>
                <Route path='/' element={<Landing/>}/>
                <Route path='/login' element={<Login/>}/>
          </Routes>
      </BrowserRouter>
    )
}
export default AppRouter
