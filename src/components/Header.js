import React, { useEffect, useState } from 'react'
import userService from '../service/userService';
import authService from '../service/authService';
import { useNavigate } from 'react-router-dom';

const Header = ({user}) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    authService.logOut()
    navigate("/")
  }
  
  return (
    <header>
        <h1>Bookster website</h1>
        <div className='user-info'>
          <p>Browsing as {user.role} {user.username}</p>
          <button className='signout-btn' onClick={handleSignOut}>Sign out</button>
        </div>
    </header>
  )
}

export default Header