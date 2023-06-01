/*
Header component. Takes the prop user that is passed from user or guest view. 

Possible improvements:
User could be called from a helper function instead of passed from guestView or userView.
*/

import React from 'react'
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
        <h1 className='logo'>Bookster website</h1>
        <div className='user-info'>
          <p>Browsing as {user?.role} {user?.username}</p>
          {user.role === "GUEST" ? <button onClick={() => navigate("/")}>Sign in</button> :
          <button className='signout-btn' onClick={handleSignOut}>Sign out</button>          
          }
        </div>
    </header>
  )
}

export default Header