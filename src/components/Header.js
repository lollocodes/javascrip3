import React, { useEffect, useState } from 'react'
import userService from '../service/userService';

const Header = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('')

  // useEffect(() => {
  //   setUsername(userService.getUsername());
  // }, [])
  
  return (
    <header>
        <h1>Bookster website</h1>
        <p>Browsing as {role} {username}</p>
        <button>Sign out</button>
    </header>
  )
}

export default Header