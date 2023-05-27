import React, { useEffect, useState } from 'react'
import userService from '../service/userService.js';
import Book from './Book.js';
import authService from '../service/authService.js';
import { useNavigate } from 'react-router-dom';
import User from './User.js';
import adminService from '../service/adminService.js'

const BooksTable = ({user}) => {
    const [books, setbooks] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllBooks()
        getAllUsers()
    }, []);

    const getAllBooks = async () => {
        let res = await userService.getBooks();
        setbooks(res)
        console.log("BOOKS", books)
    }

    const getAllUsers = async () => {
        if (user.role === "ADMIN") {
            let res = await adminService.getUsers();
            setUsers(res)
            console.log("USERS", users)
        }
    }

  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Book title</th>
                    <th>Book author</th>
                    <th>Availability</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => {
                    return (
                    <Book
                        key={book.title} 
                        book={book}
                        user={user}
                    />
                    );
                })}
            </tbody>
        </table>
        <hr />
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Purchase</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => {
                    return (
                    <User
                        key={user.username} 
                        user={user}
                    />
                    );
                })}
            </tbody>
        </table>
        
    </div>
  )
}

export default BooksTable
// how to map objects in react? 