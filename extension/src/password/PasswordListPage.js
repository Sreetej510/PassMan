import React, { useState, useEffect } from 'react';
import PasswordItem from './PasswordItem';

import './Password.css'
import InputBar from '../utils/InputBar';

function PasswordListPage() {

  const [passwordData, setPasswordData] = useState({})
  const [displayData, setDisplayData] = useState({})
  const [searchText, setSearchText] = useState('')
  const [addPasswordHidden, setAddPasswordHidden] = useState(true)
  const [searchTriggerText, setSearchTriggerText] = useState('')
  const [addWebsite, setAddWebsite] = useState('')
  const [addUsername, setAddUsername] = useState('')
  const [addPassword, setAddPassword] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(true)


  useEffect(() => {
    // TODO query the passwords data from the server and set it here
    var data = {
      "example.com": { 'usernames': ['sreetej510@gmail.com', 'testuser'], 'icon': "" },
      "gmail.com": { 'usernames': ['sreetej510', 'testuser'], 'icon': "" },
      "example.in": { 'usernames': ['testUser'], 'icon': "" }
    }
    setPasswordData(data)
  }, [])

  useEffect(() => {
    setDisplayData(passwordData)
  },[passwordData])

  useEffect(() => {
    const t = setTimeout(() => {
      if(Object.entries(passwordData).length !== 0){
        searchTigger();
      }
    }, 500);

    return () => {
      clearTimeout(t)
    }
  }, [searchText])

  useEffect(() => {
    if(addWebsite == '' || addPassword == ''){
      setSubmitDisabled(true)
    }else{
      setSubmitDisabled(false)
    }
  },[addWebsite, addPassword, addUsername])

  const closeAddPassword = (e) => {
    setAddPasswordHidden(true)
    setAddWebsite('')
    setAddUsername('')
    setAddPassword('')
  }

  const addPasswordSubmit = (e) => {
    e.preventDefault();
    if(submitDisabled == true){
      return
    }

    // complete the form to save the passwords to backend

    closeAddPassword(e)
  }

  const searchTigger = () => {
    var filteredData = passwordData;
    if(searchText !== ""){
    filteredData = Object.fromEntries(
      Object.entries(passwordData).filter(([key, value]) => {
        return (
          value.usernames.some(usernames => usernames.includes(searchText)) ||
          key.includes(searchText)
        );
      }))
    }
    setDisplayData(filteredData)
    setSearchTriggerText(searchText);
  }

  const showPasswordList = (data) => {
    if (Object.keys(data).length != 0) {
      return (
        <div id='passwordList'>
          {Object.entries(data).map(([k, v]) => {
            return <PasswordItem key={k} url={k} usernames={v.usernames} filterText={searchTriggerText} />
          })}
        </div>
      )
    } else {
      return (
        <div id='passwordListEmpty'>
            No passwords found.
        </div>
      )
    }
  }

  return (
    <div>
      <div id='addPassword' hidden={addPasswordHidden}>
        <form id='addPasswordForm' onSubmit={addPasswordSubmit}>
          <span>Add new password</span>
          <InputBar type="text" label="Website" onChange={(e) => setAddWebsite(e.target.value)} value={addWebsite}/>
          <InputBar type="text" label="Username" onChange={(e) => setAddUsername(e.target.value)} value={addUsername}/>
          <InputBar type="password" label="Password" onChange={(e) => setAddPassword(e.target.value)} value={addPassword}/>
          <div>
            <button type='button' onClick={closeAddPassword}>Cancel</button>
            <button type='submit' disabled={submitDisabled}>Save</button>
          </div>
        </form>
      </div>

      <div id='passwordListHeader'>
        <b>Passwords</b>
        <button onClick={() => {setAddPasswordHidden(false)}}>Add</button>
      </div>

      <form id='passwordListSearch' onSubmit={(e) => { e.preventDefault(); searchTigger() }}>
        <button type='submit'>
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15C11.381 15 12.6296 14.4415 13.5355 13.5355C14.4415 12.6296 15 11.381 15 10C15 7.23858 12.7614 5 10 5ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 11.5719 16.481 13.0239 15.6063 14.1921L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L14.1921 15.6063C13.0239 16.481 11.5719 17 10 17C6.13401 17 3 13.866 3 10Z" fill="#000000"></path></svg>
        </button>
        <input placeholder='Search Passwords' value={searchText} onChange={(e) => { setSearchText(e.target.value); }} />
      </form>

      {showPasswordList(displayData)}

    </div>
  );
}

export default PasswordListPage;