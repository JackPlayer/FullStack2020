import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [url, setURL] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

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

  const handleCreate = async (event) => {
    console.log("Handling create", url, author, title)
    if (url.length === 0 || author.length === 0 || title.length === 0) {
      setErrorMessage('All fields must be filled.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else {
      const newBlog = {
        title, 
        url, 
        author,
      }

     try {
        await blogService.create(newBlog)

        const newBlogs = await blogService.getAll()

        setBlogs(newBlogs)
        setURL('')
        setAuthor('')
        setTitle('') 

        createFormRef.current.toggle()
      } catch (err) {
        console.log("Something went wrong adding a blog")
      }
    }
    return Promise
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
    return (
      <div>
        <h4><strong>{user.name}</strong> is logged in.</h4>

        <Toggleable buttonPrompt="New Blog Entry" ref={createFormRef}>
          <div id="create">
            <h2>Create New</h2>
            <form onSubmit={handleCreate}>
              <label>Title: </label> <input type="text" onChange={({target}) => {setTitle(target.value)}}></input>
              <br></br>
              <label>Author: </label> <input type="text" onChange={({target}) => {setAuthor(target.value)}}></input>
              <br></br>
              <label>URL: </label> <input type="text" onChange={({target}) => {setURL(target.value)}}></input>
              <br></br>
              <button type="submit">Create</button>
            </form>
          </div>
        </Toggleable>
        <div id="blogs">
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
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