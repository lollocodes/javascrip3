import React from 'react'
import adminService from '../service/adminService.js';

const User = ({user}) => {

    const promoteUser = async (username) => {
        let res = await adminService.promoteUser({username: username});
        if (res.status === 200) {
            alert(res.message)
        }
    }


    const deleteUser  = async () => {
        let res = await adminService.deleteUser(user)
        console.log(res)
      }

  return (
    <tr>
        <td>{user.username}</td>
        <td>{user.role}</td>
        <td>{user.purchase}</td>
        <td>
            {user.role == "ADMIN" ? <button disabled>Promote</button> : <button onClick={() => promoteUser(user.username)}>Promote</button>}
            <button onClick={deleteUser}>Delete</button>
        </td>
    </tr>
  )
}

export default User