import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <Link to="/">Blogs</Link>
        <Link to="/create">Create</Link>
        <Link to="/users">Users</Link>
      </ul>
    </div>
  )
}

export default Navigation