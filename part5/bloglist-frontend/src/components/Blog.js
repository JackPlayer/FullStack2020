import React from 'react'
import PropTypes from 'prop-types'

import Toggleable from './Toggleable'


/**
 * Blog component that represents one blog post
 * Includes markup for removing and updating (liking the blog)
 * @param {} props The properties passed to the component
 */
const Blog = ({ blog, updateBlog, removeBlog, username }) => {
  const blogStyle = {
    padding: '1rem',
    width: '20%',
    marginTop: '20px',
    backgroundColor: '#EEE',
    color: '#333',
  }

  /**
   * Handles the like button being pressed. Uses the updateBlog prop function
   * @param {*} e The event handler 
   */
  const handleLike = (e) => {
    e.preventDefault()
    const updatedBlog = {
      ...blog,
      user: (blog.user !== null) ? blog.user.id : null,
      likes: blog.likes + 1
    }
    updateBlog(updatedBlog)
  }

  /**
   * Handles the remove button being pressed. Uses the removeBlog prop function
   * @param {*} e The event handler 
   */
  const handleRemove = (e) => {
    e.preventDefault()
    if (window.confirm(`Press ok to confirm removal of ${blog.title} by ${blog.author}.`) ) {
      removeBlog(blog)
    }
  }

  /**
   * Renders the remove button if the logged in user matches the user who created the blog
   */
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

Blog.propTypes = {
  blog: PropTypes.object,
  updateBlog: PropTypes.func,
  removeBlog: PropTypes.func,
  username: PropTypes.string
}