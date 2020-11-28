import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'

import BlogPage from './components/BlogPage'
import LoginPage from './components/LoginPage'
import Header from './components/Header'
import { BrowserRouter as Router } from 'react-router-dom'

import 'bulma/bulma.sass'
import './styles/style.scss'
import Footer from './components/Footer'


/**
 * Frontend for Blog List Application
 */
const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  /**
   * Runs at the initial render
   */
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if(loggedUser) {
      dispatch(setUser(JSON.parse(loggedUser)))
    }
  }, [dispatch])

  const renderApp = () => {
    if (user !== null) {
      return (
        <Router>
          <BlogPage />
        </Router>
      )
    } else {
      return <LoginPage />
    }
  }
  return (
    <div>
      <Header />
      {renderApp()}
      <Footer />
    </div>
  )

}

export default App