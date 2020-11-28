import React, { useState } from 'react'
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
  const [commentEntry, setComment] = useState('')

  /**
   * Handles the like button being pressed. Uses the updateBlog prop function
   * @param {*} e The event handler
   */
  const handleLike = (e) => {
    e.preventDefault()
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
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

  const handleAddComment = (e) => {
    e.preventDefault()
    const comment = {
      content: commentEntry,
    }
    const newCommentBlog = {
      ...blog,
      user: blog.user.id,
      comments: blog.comments.concat(comment)
    }
    dispatch(updateBlog(newCommentBlog))
    setComment('')
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
  console.log(blog)
  const renderComments = () => {
    if (blog.comments) {
      return (
        <div className="comments">
          <h3>Comments</h3>
          <form onSubmit={handleAddComment}>
            <input value={commentEntry} type="text" name="add-comment" onChange={({ target }) => {setComment(target.value)}}></input>
            <button type="submit">Add Comment</button>
          </form>
          <ul>
            {blog.comments.map((comment) => <li key={comment.id}>{comment.content}</li>)}
          </ul>
        </div>
      )
    }
    return null
  }

  return (
    blog &&
    ( <div className="blog">
      <h2 className="blog-title">{blog.title}</h2>
      <p className="blog-url"><a href={blog.url}>{blog.url}</a></p>
      <p className="blog-likes">{blog.likes} likes</p> <button className="btn-like" onClick={handleLike}>Like</button>
      <p className="blog-author">Author {blog.author}</p>
      {renderComments()}
      {renderRemoveButton()}
    </div>)
  )

}

export default Blog

Blog.propTypes = {
  blog: PropTypes.object,
}