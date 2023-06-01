/*
User could be called from a helper function instead of fetched from inside guestView or userView.
*/

import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import BooksTable from '../components/BooksTable'
import authService from '../service/authService';
import { useNavigate } from 'react-router-dom';
import userService from '../service/userService.js';

const UserView = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
      
    useEffect(() => {
        if(!authService.isAuthenticated()) {
          console.log("You are not logged in")
          navigate("/")
        }
      }, []);

    useEffect(() => {
        getUser()
      }, []);

    const getUser = async () => {
      try {
        let res = await userService.getUser();
        console.log("USER", res.user);
        
        if (res.user) {
          setUser(res.user);
        } else {
          console.log("User data not found.");
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
        <Header user={user}/>
        <div className="container">
          {user &&  <BooksTable user={user}/>}
        </div>
       
    </>
  )
}

export default UserView