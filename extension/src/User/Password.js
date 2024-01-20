import React from 'react';
import PasswordItem from './PasswordItem';

import './Password.css'

function Password() {
  return (
    <div>
      <PasswordItem url="example.com" username='sreetej' password='password'/>
    </div>
  );
}

export default Password;