import React, {useState} from 'react'
import PropTypes from 'prop-types'

/**
 * LoginForm Component that contains the markup and functionality of
 * the login page
 * @param {*} props The properties passed to the component 
 */
const LoginForm = ({login}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    login(e, username, password)

    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h2>
        Login
      </h2>
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input type="text" value={username} name="Username"  onChange = {({target}) => {setUsername(target.value)}}></input>
        <br></br>
        <label>Password</label>
        <input type="password" value={password} name="Password" onChange = {({target}) => {setPassword(target.value)}}></input>
        <br></br>
        <button type="submit">Login</button>
      </form>
      </>
  )
}

export default LoginForm

LoginForm.propTypes = {
  login: PropTypes.func
}