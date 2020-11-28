import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <div className="user section container content">
      <h2>{ user && user.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        { user && user.blogs.map((blog) => <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>) }
      </ul>
    </div>
  )
}

export default User