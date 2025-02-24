import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import StudentInput from './pages/Student-pages/StudentInput';
import StaffView from './pages/Staff-pages/StaffView';
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
