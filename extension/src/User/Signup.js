import React, { useState, useEffect } from 'react';
import { setCookie } from "../js/cookies.js";
import { post } from "../js/call.js";
import { useNavigate } from "react-router-dom";
import { checkLogin } from '../js/loginCheck.js';

import './Signup.css';
import InputBar from '../utils/InputBar.js';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate();
  useEffect(() => {
    if (checkLogin()) {
      navigate("/password");
    }
  }, [])

  useEffect(() => {
    if (password !== passwordCheck && passwordCheck !== '') {
      setErrorMsg("Passwords dont match")
    }

    if (passwordCheck === '' || password === passwordCheck) {
      setErrorMsg("")
    }
  }, [password, passwordCheck])

  const handleSignup = (e) => {
    e.preventDefault()
    if (password !== passwordCheck) {
      setErrorMsg("Both Passwords Dont match")
    } else {
      post('/user/register', {
        username: username,
        masterPassword: password
      }).then(({ data, err }) => {

        if (data) {
          var accessToken = data.accessToken
          var refreshToken = data.refreshToken
          setCookie('accessToken', accessToken, 15);
          setCookie('refreshToken', refreshToken, 14400);
          setCookie('username', username, 14400);
          navigate("/password");
        }

        if (err) {
          setErrorMsg("Signup Error!!!")
        }
      })
    }
  };

  return (
    <div className='userFormContainer'>
      <form className='userForm' onSubmit={handleSignup}>
        <h2>Signup</h2>
        <InputBar
          type="text"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputBar
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputBar
          type="password"
          label="Re-enter Password"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <div className='errorMsg'>{errorMsg}</div>
        <button type='Submit'>Signup</button>
      </form>
      <a href='/login'>Already has an account?</a>
    </div>
  );
}

export default Signup;
