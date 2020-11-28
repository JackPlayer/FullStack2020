import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, addNewBlog, remove } from './reducers/blogReducer'
import { setUser, login } from './reducers/userReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogService'
import LoginForm from './components/LoginForm'

/**
 * Frontend for Blog List Application
 */
const App = () => {
  const dispatch = useDispatch()


  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [error, setErrorMessage] = useState(null)

  /**
   * Used to reference BlogForm toggle functionality
   */
  const createFormRef = useRef()

  /**
   * Runs at the initial render
   */
  useEffect(() => {
    dispatch(initializeBlogs())
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if(loggedUser) {
      dispatch(setUser(JSON.parse(loggedUser)))
    }
  }, [dispatch])

  /**
   * Handles the login button press
   * @param {*} event The event handler of the button press
   */
  const handleLogin = async (event, username, password) => {
    event.preventDefault()
    try {
      await dispatch(login({ username, password }))
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

    } catch (exception) {
      setErrorMessage('Invalid Credentials')
    }
  }

  /**
   * Handles the logout button press
   * @param {*} event Event handler for logout
   */
  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(setUser(null))
  }

  /**
   * Calls the server with a PUT request to update the blog entry
   * Allows the likes to increment
   * @param {*} updatedBlog The updated blog object
   */
  const updateBlog = (updatedBlog) => {

    blogService.update(updatedBlog)
      .then((returnedBlog) => {
        const newBlogs = blogs.map((blog) => {
          return {
            ...blog,
            likes: (blog.id === returnedBlog.id) ? returnedBlog.likes : blog.likes
          }
        })

      })
      .catch((err) => {
        setErrorMessage(`Something went wrong trying to like the blog [${err.message}]`)

      })

  }

  /**
   * Adds a new blog
   * @param {*} blogObject The new blog to add
   */
  const addBlog = (blogObject) => {
    dispatch(addNewBlog(blogObject))
  }

  const notificationTimeout = () => {
    setErrorMessage('')
  }

  /**
   * Removes a blog
   * @param {*} blogObject The blogObject (containing the correct id) to remove
   */
  const removeBlog = (blogObject) => {
    dispatch(remove(blogObject.id))
  }

  /**
   * Renders the login page
   */
  const renderLogin = () => {
    return (
      <LoginForm login={handleLogin} />
    )
  }

  /**
   * Renders the blog list page
   */
  const renderBlogs = () => {
    const sortedBlogs = blogs.sort((a, b) => -(a.likes - b.likes))
    return (
      <div>
        <h4><strong>{user.name}</strong> is logged in.</h4>

        <Toggleable buttonPrompt="New Blog Entry" ref={createFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Toggleable>
        <div id="blogs">
          <h2>Blogs</h2>
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} username={user.username}/>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>

      </div>
    )
  }

  /**
   * Only renders the blog when logged in
   */
  return (
    <div>
      {user === null || user === undefined ? renderLogin() : renderBlogs()}
      {error && <Notification timeoutFunc={notificationTimeout} content={error} timeout={5000}/>}
    </div>
  )

}

export default App