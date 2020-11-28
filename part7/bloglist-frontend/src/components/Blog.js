import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import Toggleable from './Toggleable'


/**
 * Blog component that represents one blog post
 * Includes markup for removing and updating (liking the blog)
 * @param {} props The properties passed to the component
 */
const Blog = ({ blog }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

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
    dispatch(updateBlog(updatedBlog))
  }

  /**
   * Handles the remove button being pressed. Uses the removeBlog prop function
   * @param {*} e The event handler
   */
  const handleRemove = (e) => {
    e.preventDefault()
    if (window.confirm(`Press ok to confirm removal of ${blog.title} by ${blog.author}.`) ) {
      dispatch(removeBlog(blog.id))
    }
  }

  /**
   * Renders the remove button if the logged in user matches the user who created the blog
   */
  const renderRemoveButton = () => {
    if (blog && blog.user) {
      console.log(user)
      console.log(user.username)
      if (user.id === blog.user) {
        return (
          <button onClick={handleRemove}>Remove Post</button>
        )
      }
      if (user.username === blog.user.username) {
        return (
          <button onClick={handleRemove}>Remove Post</button>
        )
      }
    }
    return
  }

  return (
    <div className="blog">
      <h2 className="blog-title" style={{ textTransform: 'uppercase', textAlign: 'center' }}>{blog.title}</h2>
      <p className="blog-author" style={{ 'fontStyle': 'italic' }}>Author: {blog.author}</p>
      <Toggleable buttonPrompt="View">
        <p className="blog-url">URL: {blog.url}</p>
        <p className="blog-likes">Likes: {blog.likes}</p> <button className="btn-like" style={{ display: 'inline-block' }} onClick={handleLike}>Like</button>
        {renderRemoveButton()}
      </Toggleable>
    </div>
  )

}

export default Blog

Blog.propTypes = {
  blog: PropTypes.object,
}