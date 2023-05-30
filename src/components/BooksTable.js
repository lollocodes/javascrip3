import React, { useEffect, useState } from 'react'
import userService from '../service/userService.js';
import Book from './Book.js';
import authService from '../service/authService.js';
import { useNavigate } from 'react-router-dom';
import User from './User.js';
import adminService from '../service/adminService.js'
import AddBookModal from './AddBookModal.js';

const BooksTable = ({user}) => {
    const [books, setbooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchFieldBooks, setSearchFieldBooks] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('users');

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
                console.log("USER", res);
                
                if (res.users) {
                    setUsers(res.users)
                } else {
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
            setFilteredBooks(books);
        } else {
            userService.search("books", searchFieldBooks).then(data => {
                console.log(data)
                setFilteredBooks(data)
            })
        }
    } 

    const handleSave = (book) => {
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

        <div>
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

            {activeTab === 'books' ? 
            <>
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
                            <th>Order</th>
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
            </>
            
     : 
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
        }
        </div>

        
        <hr />
        
    </div>
  )
}

export default BooksTable
