import React, {useEffect, useState} from 'react'
import userService from '../service/userService.js';
import adminService from '../service/adminService.js';

const Book = ({book, user}) => {
  const [count, setCount] = useState(0);
  const [confirmationMessage, setConfirmationMessage] = useState("")

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

  const editBook = async () => {
    let res = await adminService.editBook(book)
    console.log(res)
  }
  const deleteBook = async () => {
    let res = await adminService.deleteBook(book)
    console.log(res)
  }

  return (
    <tr>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{ book.quantity == 0 ? "Out of stock" : book.quantity}</td>
        { 
          user.role=="USER" || user.role=="ADMIN" ? 
          <td>
            <button onClick={decrement}>-</button>
            {count}
            <button onClick={increment}>+</button>
            <button onClick={handleClick}>Order</button>
          </td>
          : user.role=="ADMIN" ?
          <td>
            <button onClick={editBook}>Edit</button>
            <button onClick={deleteBook}>Delete</button>
          </td>
          :
          <></>
        }
        
    </tr>
  )
}

export default Book