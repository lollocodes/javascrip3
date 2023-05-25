import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import BooksTable from '../components/BooksTable'
import authService from '../service/authService';
import { useNavigate } from 'react-router-dom';
import userService from '../service/userService.js';

const UserView = () => {
    // const navigate = useNavigate();
    const [user, setUser] = useState('');
      
    // If a user is not signed in redirect to guest view
    // if(!authService.isAuthenticated()) {
    //     navigate("/")
    // }

    // useEffect(() => {
    //     const getUser = async () => {
    //         let resp = await userService.getUser();
    //         let userData = await resp.json()
    //         setUser(userData.user)
    //     }
    //     getUser()
        
        
    //   }, []);

  return (
    <>
    <h1 data-testid="profile-header">User Page</h1>
        {/* <Header user={user}/>   */}
        <BooksTable />
    </>
  )
}

export default UserView