import React, { useEffect, useState } from 'react'
import userService from '../service/userService.js';
import Book from './Book.js';
import authService from '../service/authService.js';
import { useNavigate } from 'react-router-dom';

const BooksTable = () => {
    const [books, setbooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const getAllBooks = async () => {
            let resp = await userService.getUser();
            let user = await resp.json()
            // If user is not authenticated fetch books
            if(authService.isAuthenticated()) {
                let res = await userService.getBooks();
                setbooks(res)
                console.log(books)
            } else if(authService.isAuthenticated()) {
                console.log(authService.isAuthenticated())
            }
        }

        getAllBooks()

    }, []);

  return (
    <div>
        <table>
            <tr>
                <th>Book title</th>
                <th>Book author</th>
                <th>Availability</th>
            </tr>
                {books.map((book, index) => {
                    return (
                    <Book
                        key={book.title} 
                        book={book}
                    />
                    );
                })}
        </table>
        
    </div>
  )
}

export default BooksTable
// how to map objects in react? 