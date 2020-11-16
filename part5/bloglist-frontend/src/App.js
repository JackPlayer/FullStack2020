import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  

  const createFormRef = useRef()
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Invalid Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }
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
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
      })
    
  }
  const addBlog = (blogObject) => {
     
      blogService
        .create(blogObject)
        .then((returnedBlog) => {
          setBlogs(blogs.concat(returnedBlog))
          createFormRef.current.toggle()
        })
        .catch((err) => {
          setErrorMessage(`Something went wrong trying to add the new blog [${err.message}]`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
                
    }

  const renderLogin = () => {
    return (
      <>
        <h2>
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input type="text" value={username} name="Username" onChange = {({target}) => {setUsername(target.value)}}></input>
          <br></br>
          <label>Password</label>
          <input type="password" value={password} name="Password" onChange = {({target}) => {setPassword(target.value)}}></input>
          <br></br>
          <button type="submit">Login</button>
        </form>
      </>
    )
      
  }

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
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
        
      </div>
    )
  }

  return (
    <div>
      {user === null ? renderLogin() : renderBlogs()}
      {error && <Notification content={error} timeout={5000}/>}
    </div>
  )
  
}

export default App