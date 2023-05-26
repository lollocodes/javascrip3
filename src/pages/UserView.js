import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import BooksTable from '../components/BooksTable'
import authService from '../service/authService';
import { useNavigate } from 'react-router-dom';
import userService from '../service/userService.js';

const UserView = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
      
    // If a user is not signed in redirect to guest view
    useEffect(() => {
        if(!authService.isAuthenticated()) {
          console.log("You are not logged in")
          navigate("/")
        }
      }, []);

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
    <h1 data-testid="user-component">User Page</h1>
        {/* <Header user={user}/>   */}
        <BooksTable />
    </>
  )
}

export default UserView