import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div id="users" className="section container content">
      <h2>Users</h2>
      <table className="table is-striped is-hoverable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Posts</th>
          </tr>
        </thead>
        <tbody>
          { users.map((user) => (<tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)) }
        </tbody>
      </table>
    </div>
  )

}

export default Users