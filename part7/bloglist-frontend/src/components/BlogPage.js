import React, { useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { setUser } from '../reducers/userReducer'
import { initializeUsers } from '../reducers/usersReducer'



import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Users from './Users'
import User from './User'
import Navigation from './Navigation'

/**
 * BlogPage Component that contains the markup and functionality of
 * the blog page
 */
const BlogPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const match = useRouteMatch('/users/:id')
  const userSelected = match ? users.find(user => user.id === match.params.id) : null
  /**
   * Handles the logout button press
   * @param {*} event Event handler for logout
   */
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(setUser(null))
  }

  return (
    <div id="blog-page">
      <Navigation />
      <h4><strong>{user.name}</strong> is logged in.</h4>
      <Switch>
        <Route path="/create">
          <BlogForm />
        </Route>
        <Route path="/users/:id">
          <User user={userSelected}/>
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <BlogList />
        </Route>
      </Switch>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default BlogPage
