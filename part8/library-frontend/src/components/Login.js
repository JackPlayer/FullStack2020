import React, {useEffect, useState} from 'react';
import { useMutation } from '@apollo-client'
import { LOGIN } from '../queries/queries'

const Login = ({setToken}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-token', token)
    }
  }, [result.data])
  const handleLogin = (e) => {
    e.preventDefault();

    if (username.length === 0 || password.length === 0) return;

    login({variables: {username, password}})
  }

  return (
    <form onSubmit={(e) => handleLogin(e)}>
      <label>Username: </label><input value={username} type="text" onChange={(e) => setUsername(e.target.value)}></input>
      <label>Password: </label><input value={password} type="password" onChange={(e) => setPassword(e.target.value) }></input>
      <button type="submit">Login</button>
    </form>
  )
}

export default Login