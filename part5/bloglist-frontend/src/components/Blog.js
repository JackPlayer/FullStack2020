import React from 'react'
import Toggleable from './Toggleable'
const Blog = ({ blog }) => {
  const blogStyle = {
    padding: '1rem',
    width: '20%',
    marginTop: '20px',
    backgroundColor: '#EEE',
    color: '#333',
  }
  return (
    <div style={blogStyle}>
      <h2 style={{textTransform: 'uppercase', textAlign: 'center'}}>{blog.title}</h2>
      <p style={{"font-style": "italic"}}>Author: {blog.author}</p>
      <Toggleable buttonPrompt="View">
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes}</p> <button style={{display: 'inline-block'}}>Like</button>
      </Toggleable>
    </div>
  )
   
}
  
export default Blog
