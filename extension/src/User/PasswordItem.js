import React from 'react';

function PasswordItem(props) {
  return (
      <form className='passwordItem'>
        <div className='tag'><a>{props.url}</a></div>
        <label >Username</label>
        <input type='text' value={props.username} />
        <label >Password</label>
        <input type='password' value={props.password} />
      </form>
  );
}

export default PasswordItem;