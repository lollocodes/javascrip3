/*
User could be called from a helper function instead of fetched from inside guestView or userView.
*/

import React, { useEffect } from 'react'
import BooksTable from '../components/BooksTable'
import Header from '../components/Header'
import authService from '../service/authService'
import { useNavigate } from 'react-router-dom'

const GuestView = () => {
    const navigate = useNavigate();
    const user = {role: "GUEST"}
    // If a user is signed in redirect to user view
    useEffect(() => {
      console.log(authService.isAuthenticated())
        if(authService.isAuthenticated()) {
            navigate("/user")
        }
    }, []);

  return (
    <div>
        <Header user={user}/>
        <div className="container">
          <BooksTable user={user} />
        </div>
    </div>
  )
}

export default GuestView