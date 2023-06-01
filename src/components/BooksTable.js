/*
  The component represents a table that maps through a list of either books or users.

  Possible improvements:
  This component is very large, function and sections could be imported instead to make the file smaller and more readable.
*/

import React, { useEffect, useState } from 'react'
import userService from '../service/userService.js';
import Book from './Book.js';
import User from './User.js';
import adminService from '../service/adminService.js'
import AddBookModal from './AddBookModal.js';

const BooksTable = ({user}) => {
    const [books, setbooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchFieldBooks, setSearchFieldBooks] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('books');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        getAllBooks()
        getAllUsers()
    }, []);

    const getAllBooks = async () => {
        try {
            let res = await userService.getBooks();            
            if (res.books) {
                setbooks(res.books)
                setFilteredBooks(res.books)
            } else {
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
                if (res.users) {
                    setUsers(res.users)
                    setFilteredUsers(res.users)
                } else {
                  console.log("User data not found");
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
            setFilteredBooks(books);
        } else {
            userService.search("books", searchFieldBooks).then(data => {
                setFilteredBooks(data.books)
            })
        }
    } 

    const handleSearchUsers = (e) => {
        const query = e.target.value;
        setFilteredUsers(query);
        if (query === '') {
            setFilteredUsers(users);
        } else {
            const filteredData = users.filter(user => 
                user.username.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredUsers(filteredData)
        }
    }

    const handleSave = (book) => {
        const body = { author: book.author, title: book.title, quantity: book.quantity }
        adminService.addBook(body);
      };

    const openModal = () => {
        setIsModalOpen(true);
      };
    
    const closeModal = () => {
       setIsModalOpen(false);
    };

  return (
    <div>
        <div>
            {
                user.role === "ADMIN" ?
                <div className="tab-buttons">
                    <button
                    className={activeTab === 'users' ? 'active' : ''}
                    onClick={() => handleTabChange('users')}
                    >
                    Users
                    </button>
                    <button
                    className={activeTab === 'books' ? 'active' : ''}
                    onClick={() => handleTabChange('books')}
                    >
                    Books
                    </button>
                </div>
                : <></>
            }

            {activeTab === 'users' ? 
                <>
                    {user.role === "ADMIN" ?
                        <>
                        <input name="searchUsers" className='searchBooks' type="text" placeholder='Search user' onChange={handleSearchUsers} />
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
                                {filteredUsers.map((user, index) => {
                                    return (
                                    <User
                                        key={user.username} 
                                        user={user}
                                    />
                                    );
                                })}
                            </tbody>
                        </table>
                        </>
                        : <></>
                    }   
                </>
            :
                <>
                    <div className="table-controls">
                        <input
                            type="text"
                            name="searchBooks"
                            className='searchBooks'
                            value={searchFieldBooks}
                            onChange={handleSearch}
                            placeholder="Search for a book"
                        />
                        { user.role==="ADMIN" ? 
                        <>
                        <button onClick={openModal}>Add book</button>
                        <AddBookModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
                        </>
                        : <></> }
                    </div>
                
                    <table>
                        <thead>
                            <tr>
                                <th>Book title</th>
                                <th>Book author</th>
                                <th>Availability</th>
                                { user.role !== "GUEST" ?
                                <th>Order</th> 
                                :<></>
                                }
                                {  user.role==="ADMIN" ?
                                <th>Action</th> : <></>}
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
                </>
            }
        </div>        
    </div>
  )
}

export default BooksTable
