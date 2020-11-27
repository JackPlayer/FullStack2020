import React, { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * BlogForm Component that contains the markup and functionality of
 * a create new blog form
 * @param {*} props The properties passed to the component
 */
const BlogForm = ({ createBlog }) => {
  const [url, setURL] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  /**
   * Handles the add blog button being pressed. Calls the create blog
   * prop function
   * @param {*} e The event handler
   */
  const handleAddBlog = (e) => {
    e.preventDefault()

    createBlog({
      url,
      title,
      author,
    })

    setAuthor('')
    setTitle('')
    setURL('')
  }

  return (
    <div id="create-blog">
      <h2>Create New</h2>
      <form onSubmit={handleAddBlog}>
        <label>Title: </label> <input id="input-title" type="text" value={title} onChange={({ target }) => {setTitle(target.value)}}></input>
        <br></br>
        <label>Author: </label> <input id="input-author" type="text" value={author} onChange={({ target }) => {setAuthor(target.value)}}></input>
        <br></br>
        <label>URL: </label> <input type="text" id="input-url" value={url} onChange={({ target }) => {setURL(target.value)}}></input>
        <br></br>
        <button type="submit">Create</button>
      </form>
    </div>

  )
}

export default BlogForm

BlogForm.propTypes = {
  createBlog: PropTypes.func
}