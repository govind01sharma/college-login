import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import StudentInput from './StudentInput';
import StaffView from './StaffView'; // Ensure this is imported
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/updateStudent/:collegeID' element={<StudentInput />} /> {/* Updated route parameter */}
        <Route path='/staff' element={<StaffView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
