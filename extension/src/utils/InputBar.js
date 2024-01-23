import React from 'react';
import './InputBar.css'

function InputBar(props) {
  return (
  <div className='input-box'>
    <input className='input' required type={props.type} onChange={props.onChange} value={props.value}/>
    <label className='label'>{props.label}</label>
  </div>
  );
}

export default InputBar;
