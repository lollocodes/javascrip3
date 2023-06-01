/*
  The component represents a table row with table data such as username, user role and purchases.
*/

import React, { useState } from 'react'
import adminService from '../service/adminService.js';
import DeleteModal from './DeleteModal.js';

const User = ({user}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState();

    const promoteUser = async () => {
        let res = await adminService.promoteUser({username: user.username});
    }

    const deleteUser  = async () => {
        let res = await adminService.deleteUser(user)
    } 

    const openModal = (btn) => {
        setIsModalOpen(true);
        setAction(btn)
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

  return (
    <tr>
        <td>{user.username}</td>
        <td>{user.role}</td>
        <td>{user.purchases === undefined ? "0 purchases" : <>{user.purchases.length} purchases </>}</td>
        <td>
            {user.role === "ADMIN" ? 
                <button disabled>Promote</button> 
            :
                <button data-testid="promote" onClick={() => openModal("promote")}>Promote</button>
            }

            <button onClick={() => openModal("delete")} className='delete-btn' data-testid="delete-btn">Delete</button>
            <DeleteModal user={user} act={action} isOpen={isModalOpen} onClose={closeModal} onPromote={promoteUser} onDelete={deleteUser} />
        </td>
    </tr>
  )
}

export default User