import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log("Error: Invalid Credentials")
      setErrorMessage('Invalid Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    setUser(null)
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
        <h2>Blogs</h2>
        <p>{user.name} is logged in.</p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}

        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

  return (
    <div>
      {user === null ? renderLogin() : renderBlogs()}
      <p id="errorMsg">{error}</p>
    </div>
  )
  
}

export default App