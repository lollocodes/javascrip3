/*
  Login component.
  Possible improvements: 
  Component could be made smaller.
*/

import React, { useEffect } from 'react'
import { useState } from 'react';
import CredentialComponent from '../components/CredentialComponent.js';
import authService from '../service/authService.js';
import memoryService from '../service/memoryService.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credential, setCredential] = useState({username: '', password: ''});
    const [infoMessage, setInfoMessage] = useState('');
    const navigate = useNavigate();

  useEffect(() => {
    if(authService.isAuthenticated()) {
      navigate("/user")
    }
  }, []);

    const submitHandler = async (event) => {
      event.preventDefault();

      let res = await authService.authenticate(credential);

      if(res.status >= 400) {
        let text = await res.text();
        setInfoMessage(text);
      } else {
        let data = await res.json();
        setInfoMessage(data.message);
        memoryService.saveLocalValue("JWT_TOKEN", data.accessToken);

        setTimeout(() => navigate("/user"), 1000);
      }
    }
  
    const handleChange = ({name, value}) => {
      setCredential({...credential, [name]: value});
    }
  
    return (
      <div className='log-in'>
        <form onSubmit={submitHandler}>
          <h2>Login</h2>
          <CredentialComponent onTextChange={handleChange} />
          <p>{infoMessage}</p>
  
          <button type="submit">Login</button>
          <a href="register">No account? Sign up here!</a>

          <button onClick={() => navigate("/guest")}>Continue as guest</button>
        </form>
  
      </div>
    )
}

export default Login