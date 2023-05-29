import React, { useEffect, useState } from 'react'
import userService from '../service/userService.js';
import Book from './Book.js';
import authService from '../service/authService.js';
import { useNavigate } from 'react-router-dom';
import User from './User.js';
import adminService from '../service/adminService.js'
import Search from './Search.js'


const BooksTable = ({user}) => {
    const [books, setbooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchField, setSearchField] = useState("");


    useEffect(() => {
        getAllBooks()
        getAllUsers()
    }, []);

    const getAllBooks = async () => {
        try {
            let res = await userService.getBooks();
            console.log("USER", res.user);
            
            if (res.books) {
                console.log("kankefjrkbfekr")
                setbooks(res.books)
            } else {
              // Handle the case when user data is not available
              console.log("User data not found.");
            }
          } catch (error) {
            console.log(error);
          }
    }

    const getAllUsers = async () => {
        if (user.role === "ADMIN") {
            try {
                let res = await adminService.getUsers();
                console.log("USER", res.user);
                
                if (res.users) {
                    console.log("kankefjrkbfekr")
                    setUsers(res.users)
                } else {
                  // Handle the case when user data is not available
                  console.log("User data not found.");
                }
              } catch (error) {
                console.log(error);
              }
        }
        
    }

    const handleSearch = () => {
        userService.search("books", searchField).then(data => {
            console.log(data)
            setFilteredBooks(data)
        })
    }

  return (
    <div>
        <input 
            className="search_input"
            type = "text" 
            placeholder = "Search books" 
            onChange={(e) => setSearchField(e.target.value)}
            onKeyDown={(e) => {if (e.key === "Enter") {handleSearch()}}}
            value={searchField}
        />
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
        <Search placeholder="Search user" endpoint="users"/>
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
