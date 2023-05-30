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
    console.log("You added ", count, "of ", book.title)

    let body = {title: book.title, quantity: count}

    let res = await userService.addBook(body)
    // let data = await res.text();
    console.log(res)
    // setConfirmationMessage(res.message)
    // alert(confirmationMessage)
  }

  const deleteBook = async () => {
    let res = await adminService.deleteBook(book)
    console.log(res)
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (updatedBook) => {
    // Perform save operation
    console.log(updatedBook)
    console.log(book.title)
    const body = { previous: {title: book.title}, current: updatedBook }
    console.log(body)
    let res = adminService.editBook(body);
    console.log(res)
  };

  return (
    <tr>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{ book.quantity == 0 ? "Out of stock" : <> {book.quantity} left </>}</td>
        { 
          user.role=="USER" || user.role=="ADMIN" ? 
          <td>
            <button className="quantity-btn" onClick={decrement}>-</button>
            {count}
            <button className="quantity-btn" onClick={increment}>+</button>
            <button onClick={handleClick}>Order</button>
          </td>
          :
          <></>
          
        }
        {  user.role=="ADMIN" ?
          <td>
            <button onClick={openModal}>Edit</button>
            <EditBookModal isOpen={isModalOpen} onClose={closeModal} book={editedBook} onSave={handleSave} />
            <button onClick={deleteBook}>Delete</button>
          </td>
          : <></>}
        
    </tr>
  )
}

export default Book