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
        <h1>Guest view</h1>
        <BooksTable user={user} />
    </div>
  )
}

export default GuestView