import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import StudentInput from './StudentInput';
import StaffView from './StaffView';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/updateStudent/:collegeID" element={<StudentInput />} />
        <Route path="/staff" element={<StaffView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
