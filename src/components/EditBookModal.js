import React, { useState } from 'react';

const EditBookModal = ({ isOpen, onClose, book, onSave }) => {
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [quantity, setQuantity] = useState(book.quantity);

    const handleNameChange = (e) => {
      setTitle(e.target.value);
    };
  
    const handleAuthorChange = (e) => {
      setAuthor(e.target.value);
    };

    const handleQuantityChange = (e) => {
      setQuantity(e.target.value);
    };
  
    const handleSave = () => {
      const updatedBook = { ...book, title: title, author: author, quantity: quantity };
      onSave(updatedBook);
      onClose();
    };

    return (
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <h2>Edit Book</h2>
          <label>
            Title:
            <input type="text" value={title} onChange={handleNameChange} />
          </label>
          <label>
            Author:
            <input type="text" value={author} onChange={handleAuthorChange} />
            </label>
          <label>
            Quantity:
            <input type="text" value={quantity} onChange={handleQuantityChange} />
          </label>
          <div className="modal-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };
export default EditBookModal;
