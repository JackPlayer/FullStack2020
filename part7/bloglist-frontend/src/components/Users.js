import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div id="users">
      <table>
        <tr>
          <th>Name</th>
          <th>Posts</th>
        </tr>
        { users.map((user) => (<tr key={user.id}><td>{user.name}</td><td>{user.blogs.length}</td></tr>)) }
      </table>
    </div>
  )

}

export default Users