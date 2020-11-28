import React from 'react'

const User = ({ user }) => {
  return (
    <div className="user">
      <h2>{ user && user.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        { user && user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>) }
      </ul>
    </div>
  )
}

export default User