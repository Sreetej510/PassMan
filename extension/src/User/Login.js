import React, { useState, useEffect } from 'react';
import { setCookie } from "../js/cookies.js";
import { post } from "../js/call.js";
import { checkLogin } from '../js/loginCheck.js';
import { useNavigate } from "react-router-dom";

import './Login.css';
import InputBar from '../utils/InputBar.js';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    if (checkLogin()) {
      navigate("/password");
    }
  }, [])


  const handleLogin = (e) => {
    e.preventDefault()
    console.log(post('/user/login', {
      username: username,
      masterPassword: password
    }))

    post('/user/login', {
      username: username,
      masterPassword: password
    }).then(({data,err}) => {
      if (data) {
        var accessToken = data.accessToken
        var refreshToken = data.refreshToken
        setCookie('accessToken', accessToken, 15);
        setCookie('refreshToken', refreshToken, 14400);
        setCookie('username', username, 14400);
        navigate("/password");
      }
  
      if (err) {
        setErrorMsg("Login Error!!")
      }
    })
  };

  return (
    <div className='userFormContainer'>
      <form className='userForm' onSubmit={handleLogin}>
        <h2>Login</h2>
        <InputBar label="Username" type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>
        <InputBar label="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
        <div className='errorMsg'>{errorMsg}</div>
        <button type='Submit'>Login</button>
      </form>
      <a href='/signup'>Don't have an account?</a>
    </div>
  );
}

export default Login;
