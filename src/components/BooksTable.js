import React, { useEffect, useState } from 'react'
import userService from '../service/userService.js';
import Book from './Book.js';
import authService from '../service/authService.js';
import { useNavigate } from 'react-router-dom';

const BooksTable = () => {
    const [books, setbooks] = useState([]);

    useEffect(() => {

        const getAllBooks = async () => {

            // If user is not authenticated fetch books
            if(authService.isAuthenticated()) {
                console.log("user is logged in")
            } else {
                console.log("User is not logged in", authService.isAuthenticated())
                let res = await userService.getBooks();
                setbooks(res)
                console.log(books)
            }
        }

        getAllBooks()

    }, []);

  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Book title</th>
                    <th>Book author</th>
                    <th>Availability</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => {
                    return (
                    <Book
                        key={book.title} 
                        book={book}
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