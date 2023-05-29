import React, { useState } from 'react';

const EditBookModal = ({ isOpen, onClose, book, onSave }) => {
  const [name, setName] = useState(book.name);
  const [author, setAuthor] = useState(book.author);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleSave = () => {
    const updatedBook = { ...book, name, author };
    onSave(updatedBook);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Edit Book</h2>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Author:
          <input type="text" value={author} onChange={handleAuthorChange} />
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
