import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../reducers/userReducer'

/**
 * LoginPage Component that contains the markup and functionality of
 * the login page
 */
const LoginPage = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)

  const handleLogin = (e) => {
    e.preventDefault()

    dispatch(login({ username, password }))
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

    setUsername('')
    setPassword('')
  }

  return (
    <div className="container section">
      <h2>
        Login
      </h2>
      <form id="login-form" onSubmit={handleLogin}>
        <div className="field">
          <label className="label">Username</label>
          <input className="input" type="text" value={username} name="Username"  id="username" onChange = {({ target }) => {setUsername(target.value)}}></input>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input className="input" type="password" value={password} name="Password" id="password" onChange = {({ target }) => {setPassword(target.value)}}></input>
        </div>
        <button className="button is-link" type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage
