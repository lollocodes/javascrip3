import React, { useEffect, useState } from 'react'
import userService from '../service/userService.js';
import Book from './Book.js';
import authService from '../service/authService.js';
import { useNavigate } from 'react-router-dom';
import User from './User.js';
import adminService from '../service/adminService.js'
import Search from './Search.js'
import AddBookModal from './AddBookModal.js';


const BooksTable = ({user}) => {
    const [books, setbooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchFieldBooks, setSearchFieldBooks] = useState("");
    const [searchFieldUsers, setSearchFieldUsers] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);


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
                setFilteredBooks(res.books)
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
                    setFilteredUsers(res.users)
                } else {
                  // Handle the case when user data is not available
                  console.log("User data not found.");
                }
              } catch (error) {
                console.log(error);
              }
        }
        
    }

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchFieldBooks(query);
        if (query === '') {
            setFilteredBooks(books); // Show the original book list when query is empty
        } else {
            userService.search("books", searchFieldBooks).then(data => {
                console.log(data)
                setFilteredBooks(data)
            })
        }
    } 

    const handleSave = (book) => {
        console.log(book)
        const body = { author: book.author, title: book.title, quantity: book.quantity }
        let res = adminService.addBook(body);
        console.log(res)
      };

    const openModal = () => {
        setIsModalOpen(true);
      };
    
    const closeModal = () => {
       setIsModalOpen(false);
    };


  return (
    <div>
        <input
            type="text"
            name="searchBooks"
            value={searchFieldBooks}
            onChange={handleSearch}
            placeholder="Search for a book"
        />
        <button onClick={openModal}>Add book</button>
        <AddBookModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
        
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
                {filteredBooks.map((book, index) => {
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
