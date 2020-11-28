import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blogReducer'


/**
 * Blog component that represents one blog post
 * Includes markup for removing and updating (liking the blog)
 * @param {} props The properties passed to the component
 */
const Blog = ({ blog }) => {
  const history = useHistory()
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
      history.push('/')
    }
  }

  /**
   * Renders the remove button if the logged in user matches the user who created the blog
   */
  const renderRemoveButton = () => {
    if (blog && blog.user) {
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
      <h2 className="blog-title">{blog.title}</h2>
      <p className="blog-url"><a href={blog.url}>{blog.url}</a></p>
      <p className="blog-likes">{blog.likes} likes</p> <button className="btn-like" onClick={handleLike}>Like</button>
      <p className="blog-author">Author {blog.author}</p>

      {renderRemoveButton()}
    </div>
  )

}

export default Blog

Blog.propTypes = {
  blog: PropTypes.object,
}