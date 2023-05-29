import React, { useState } from 'react';

const AddBookModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [quantity, setQuantity] = useState();

  const handleNameChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAdd = () => {
    const newBook = { title: title, author: author, quantity: quantity };
    onSave(newBook);
    setTitle('');
    setAuthor('');
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Add Book</h2>
        <label>
          Title:
          <input type="text" value={title} onChange={handleNameChange} />
        </label>
        <label>
          Quantity:
          <input type="text" value={quantity} onChange={handleQuantityChange} />
        </label>
        <label>
          Author:
          <input type="text" value={author} onChange={handleAuthorChange} />
        </label>
        <div className="modal-actions">
          <button onClick={handleAdd}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
