import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './User/Login';
import Signup from './User/Signup';
import Password from './User/Password.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/password" element={<Password />} />
        {/* Add a default route for handling other paths */}
        <Route path="/*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
