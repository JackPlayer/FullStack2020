import React from 'react'
import Toggleable from './Toggleable'

const Blog = ({ blog, updateBlog, removeBlog, username }) => {
  const blogStyle = {
    padding: '1rem',
    width: '20%',
    marginTop: '20px',
    backgroundColor: '#EEE',
    color: '#333',
  }

  const handleLike = (e) => {
    e.preventDefault()
    const updatedBlog = {
      ...blog,
      user: (blog.user !== null) ? blog.user.id : null,
      likes: blog.likes + 1
    }
    updateBlog(updatedBlog)
  }

  const handleRemove = (e) => {
    e.preventDefault()
    if (window.confirm(`Press ok to confirm removal of ${blog.title} by ${blog.author}.`) ) {
      removeBlog(blog)
    }
  }

  const renderRemoveButton = () => {
    if (blog && blog.user) {
      if (username === blog.user.username) {
        return (
          <button onClick={handleRemove}>Remove Post</button>
        )
      }
    } 
    return
  }
  return (
    <div style={blogStyle}>
      <h2 style={{textTransform: 'uppercase', textAlign: 'center'}}>{blog.title}</h2>
      <p style={{"fontStyle": "italic"}}>Author: {blog.author}</p>
      <Toggleable buttonPrompt="View">
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes}</p> <button style={{display: 'inline-block'}} onClick={handleLike}>Like</button>
        {renderRemoveButton()}
      </Toggleable>
    </div>
  )
   
}
  
export default Blog
