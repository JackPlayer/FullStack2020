import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { setUser } from '../reducers/userReducer'

import BlogForm from './BlogForm'
import BlogList from './BlogList'

/**
 * BlogPage Component that contains the markup and functionality of
 * the blog page
 */
const BlogPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  /**
   * Handles the logout button press
   * @param {*} event Event handler for logout
   */
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(setUser(null))
  }

  return (
    <div id="blog-page">
      <h4><strong>{user.name}</strong> is logged in.</h4>
      <BlogForm />
      <BlogList />
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default BlogPage
