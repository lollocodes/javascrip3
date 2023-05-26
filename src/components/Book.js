import React, {useState} from 'react'
import userService from '../service/userService.js';

const Book = ({book}) => {
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
  
  return (
    <tr>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{ book.quantity == 0 ? "Out of stock" : book.quantity}</td>
        <td>
          <button onClick={decrement}>-</button>
          {count}
          <button onClick={increment}>+</button>
          <button onClick={handleClick}>Order</button>
        </td>
    </tr>
  )
}

export default Book