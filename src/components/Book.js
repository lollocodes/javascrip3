/*
  The component represents a table row with table data such as book's title, author, and quantity.

  Possible improvements: 
  The component is large and could be split in more components and functions could be imported instead.
  confirmationMessage state could be used to confirm that an order has been placed.
*/

import React, {useEffect, useState} from 'react'
import userService from '../service/userService.js';
import adminService from '../service/adminService.js';
import EditBookModal from './EditBookModal.js';

const Book = ({book, user}) => {
  const [count, setCount] = useState(0);
  const [confirmationMessage, setConfirmationMessage] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedBook, setEditedBook] = useState(book);

  const increment = () => {
    if (count < book.quantity) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleClick = async () => {
    let body = {title: book.title, quantity: count}

    let res = await userService.addBook(body)
  }

  const deleteBook = async () => {
    let res = await adminService.deleteBook(book)
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (updatedBook) => {
    // Perform save operation
    const body = { previous: {title: book.title}, current: updatedBook }
    adminService.editBook(body);
  };

  return (
    <tr>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{ book.quantity == 0 ? "Out of stock" : <> {book.quantity} left </>}</td>
        { 
          user.role=="USER" || user.role=="ADMIN" ? 
          <td className='quantity-td'>
            <div>
              <button className="quantity-btn" onClick={decrement}>-</button>
              {count}
              <button className="quantity-btn" onClick={increment}>+</button>
            </div>
            <button onClick={handleClick}>Order</button>
          </td>
          :
          <></>
        }
        {  user.role=="ADMIN" ?
          <td className='action-td'>
            <button onClick={openModal}>Edit</button>
            <EditBookModal isOpen={isModalOpen} onClose={closeModal} book={editedBook} onSave={handleSave} />
            <button onClick={deleteBook}>Delete</button>
          </td>
          : <></>}
        
    </tr>
  )
}

export default Book