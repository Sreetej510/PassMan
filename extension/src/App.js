import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import Signup from './user/Signup';
import PasswordListPage from './password/PasswordListPage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/password" element={<PasswordListPage />} />
        {/* Add a default route for handling other paths */}
        <Route path="/*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
