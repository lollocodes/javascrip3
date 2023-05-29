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
        <p>Browsing as {user.role} {user.username}</p>
        <button onClick={handleSignOut}>Sign out</button>
    </header>
  )
}

export default Header