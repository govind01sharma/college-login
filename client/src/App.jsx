import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Login from './Login'
import StudentInput from './StudentInput'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/updateStudent' element={<StudentInput />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
