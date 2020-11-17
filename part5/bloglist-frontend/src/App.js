import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

/**
 * Frontend for Blog List Application
 */
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error, setErrorMessage] = useState(null)



  /**
   * Used to reference BlogForm toggle functionality
   */
  const createFormRef = useRef()

  /**
   * Runs at the initial render
   */
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  /**
   * Handles the login button press
   * @param {*} event The event handler of the button press
   */
  const handleLogin = async (event, username, password) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
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
    setUser(null)
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
        setBlogs(newBlogs)
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

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        createFormRef.current.toggle()
      })
      .catch((err) => {
        setErrorMessage(`Something went wrong trying to add the new blog [${err.message}]`)
      })

  }

  const notificationTimeout = () => {
    setErrorMessage("")
  }

  /**
   * Removes a blog
   * @param {*} blogObject The blogObject (containing the correct id) to remove
   */
  const removeBlog = (blogObject) => {
    blogService
      .remove(blogObject)
      .then(() => {
        setBlogs(blogs.filter((blog) => {
          return blog.id !== blogObject.id
        }))
      })
      .catch((err) => {
        setErrorMessage(`Something went wrong trying to remove the new blog [${err.message}]`)
        
      })
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
      {user === null ? renderLogin() : renderBlogs()}
      {error && <Notification timeoutFunc={notificationTimeout} content={error} timeout={5000}/>}
    </div>
  )

}

export default App