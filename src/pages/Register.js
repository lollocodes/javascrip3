/*
  Register component
  Possible improvements: 
  Component could be made smaller.
*/

import React from 'react'
import { useState } from 'react';
import CredentialComponent from '../components/CredentialComponent.js';
import authService from '../service/authService.js';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Register () {
  const [credential, setCredential] = useState({username: '', password: ''});
  const [infoMessage, setInfoMessage] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    let res = await authService.register(credential);

    if(res.status >= 400) {
      let text = await res.text();
      setInfoMessage(text);
    } else {
      let text = await res.text();
      setInfoMessage(text);
      setTimeout(() => navigate("/user"), 1000);
    }
  }

  const handleChange = ({name, value}) => {
    setCredential({...credential, [name]: value});
  }

  return (
    <div className='log-in'>
      <form onSubmit={submitHandler}>
        <h2>Register</h2>
        <CredentialComponent onTextChange={handleChange} />
        <p>{infoMessage}</p>
        
        <button type="submit">Register account</button>
        <a href="/">Already have an account? Sign in here!</a>
      </form>
    </div>
  )
}