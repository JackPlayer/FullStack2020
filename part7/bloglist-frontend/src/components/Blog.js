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
    if (commentEntry !== '') {
      const comment = {
        content: commentEntry,
      }

      const newCommentBlog = {
        ...blog,
        user: blog.user.id,
        comments: blog.comments.concat(comment)
      }
      dispatch(updateBlog(newCommentBlog))
    }

    setComment('')
  }

  /**
   * Renders the remove button if the logged in user matches the user who created the blog
   */
  const renderRemoveButton = () => {
    if (blog && blog.user) {
      if (user.username === blog.user.username) {
        return (
          <button className="button is-danger is-medium" onClick={handleRemove}>
            <span className="icon is-small">
              <i className="fas fa-trash"></i>
            </span>
            <span>Remove Post</span>
          </button>
        )
      }
    }
    return
  }

  const renderComments = () => {
    if (blog.comments) {
      return (
        <div className="comments">
          <h3>Comments</h3>
          <ul>
            {blog.comments.map((comment) => <li key={comment.id}>{comment.content}</li>)}
          </ul>
          <form onSubmit={handleAddComment}>
            <div className="field">
              <textarea className="textarea" value={commentEntry} type="text" name="add-comment" onChange={({ target }) => {setComment(target.value)}}></textarea>
            </div>
            <button className="button is-link is-small" type="submit">Add Comment</button>
          </form>

        </div>
      )
    }
    return null
  }

  return (
    blog &&
    ( <div className="blog content container section">
      <h2 className="blog-title">{blog.title}</h2>
      <p className="blog-url"><a href={blog.url}>{blog.url}</a></p>
      <div className="blog-likes">
        <p>{blog.likes} likes</p>
        <button className="button is-small is-success" onClick={handleLike}>
          <span className="icon is-small"><i className="far fa-thumbs-up"></i></span>
          <span>Like</span>
        </button>
      </div>
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