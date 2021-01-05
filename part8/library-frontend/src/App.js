
import React, { useState, useEffect } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('library-token')
    if (token) setToken(token)
  }, [])
  const handleLogout = (e) => {
    e.preventDefault()
    
    setToken(null)
    localStorage.clear()
    setPage('books')

  } 
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {token && <button onClick={() => setPage('add')}>add book</button> }
        {!token && <button onClick={() => setPage('login')}>login</button> }
        {token && <button onClick={(e) => handleLogout(e)}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommendations'}
      />
      
      {!token && <Login setToken={setToken} show={page === 'login'}/>}

    </div>
  )
}

export default App