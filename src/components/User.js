import React from 'react'

const User = ({user}) => {

    const promoteUser = () => {
        console.log(user)
    }
    const deleteUser = () => {
        console.log(user)
    }
  return (
    <tr>
        <td>{user.username}</td>
        <td>{user.role}</td>
        <td>{user.purchase}</td>
        <td>
            <button onClick={deleteUser}>Delete</button>
            {user.role == "ADMIN" ? <button disabled>Promote</button> : <button onClick={promoteUser}>Promote</button>}
        </td>
    </tr>
  )
}

export default User