import React from 'react';
import PasswordItem from './PasswordItem';

import './Password.css'

function PasswordListPage() {
  return (
    <div>
      <h1>Passwords</h1>
      <div id='passwordList'>
        <PasswordItem url="example.com" accountCount='2' />
        <PasswordItem url="example.com" accountCount='1' />
        <PasswordItem url="example.com" />

      </div>
    </div>
  );
}

export default PasswordListPage;