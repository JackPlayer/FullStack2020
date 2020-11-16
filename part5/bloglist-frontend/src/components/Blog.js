import React from 'react'
import Toggleable from './Toggleable'

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    padding: '1rem',
    width: '20%',
    marginTop: '20px',
    backgroundColor: '#EEE',
    color: '#333',
  }

  const handleLike = (e) => {
    console.log(blog.user);
    e.preventDefault()
    const updatedBlog = {
      ...blog,
      user: (blog.user !== null) ? blog.user.id : null,
      likes: blog.likes + 1
    }
    updateBlog(updatedBlog)
  }
  return (
    <div style={blogStyle}>
      <h2 style={{textTransform: 'uppercase', textAlign: 'center'}}>{blog.title}</h2>
      <p style={{"fontStyle": "italic"}}>Author: {blog.author}</p>
      <Toggleable buttonPrompt="View">
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes}</p> <button style={{display: 'inline-block'}} onClick={handleLike}>Like</button>
      </Toggleable>
    </div>
  )
   
}
  
export default Blog
