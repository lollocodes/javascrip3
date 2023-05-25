import React, { useEffect } from 'react'
import Header from '../components/Header'
import BooksTable from '../components/BooksTable'
import authService from '../service/authService';
import { useNavigate } from 'react-router-dom';

const UserView = () => {
    const navigate = useNavigate();

    // If a user is not signed in redirect to guest view
    useEffect(() => {
        //   if(!authService.isAuthenticated()) {
        //       navigate("/")
        //   }
      }, []);
  
  return (
    <>
        <Header/>  
        <BooksTable />
    </>
  )
}

export default UserView