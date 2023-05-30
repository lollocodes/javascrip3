import React, { useState } from 'react';

const DeleteModal = ({ isOpen, onClose, onDelete, act, onPromote, user}) => {

  const handleConfirm = (act) => {
    if (act==="delete") {
        onDelete();
    } else if (act==="promote") {
        onPromote();
    }
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Are you sure you want to delete/promote {user.username}?</h2>
        <div className="modal-actions">
          <button data-testid="confirm" onClick={() => handleConfirm(act)}>Yes</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
