import React, { useEffect, useState } from 'react'
import userService from '../service/userService';

const Header = ({user}) => {


  // useEffect(() => {
  //   setUsername(userService.getUsername());
  // }, [])
  
  return (
    <header>
        <h1>Bookster website</h1>
        <p>Browsing as {user.role} {user.username}</p>
        <button>Sign out</button>
    </header>
  )
}

export default Header