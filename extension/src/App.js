import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './user/Login';
import Signup from './user/Signup';
import PasswordListPage from './password/PasswordListPage.js';
import Details from './details/Details.js';
import { checkLogin } from './js/loginCheck.js';

function App() {

  const PrivateRoute = ({ element }) => {
    return checkLogin() ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/password"
          element={<PrivateRoute element={<PasswordListPage />}/>}
        />
        <Route
          path="/details/:id"
          element={<PrivateRoute element={<Details />} />}
        />
        {/* Add a default route for handling other paths */}
        <Route path="/*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
