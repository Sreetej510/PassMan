import React, { useState } from 'react';
import './InputBar.css'

function InputBar(props) {
  const hasValue = !!props.value;
  const [type, setType] = useState(props.type)

  return (
    <div className='input-box'>
      <input disabled={props.disabled} className='input' required type={type} onChange={props.onChange} value={props.value} />
      <label className={`label ${hasValue ? 'has-value' : ''}`}>{props.label}</label>

      <div className='buttons'>
        {
          props.passwdShow &&
          <button className="passwdShowBtn" type='button' onClick={() => {
            if (type == "password") {
              setType("text")
            } else {
              setType("password")
            }
          }}>
            <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#545454">
              <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#545454"></path>
              <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#545454"></path>
            </svg>
          </button>
        }

        {
          props.copy &&
          <button type='button' className='copyBtn'
            onClick={() => {
              navigator.clipboard.writeText(props.value)
            }}>
            <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#545454">
              <path d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z" fill="#545454"></path>
              <path d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z" fill="#545454"></path></svg>
          </button>
        }
      </div>
    </div>
  );
}


export default InputBar;
