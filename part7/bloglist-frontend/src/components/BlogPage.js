import React, { useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { setUser } from '../reducers/userReducer'
import { initializeUsers } from '../reducers/usersReducer'



import BlogForm from './BlogForm'
import Blog from './Blog'
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
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const userMatch = useRouteMatch('/users/:id')
  const userSelected = userMatch ? users.find(user => user.id === userMatch.params.id) : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogSelected = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null
  /**
   * Handles the logout button press
   * @param {*} event Event handler for logout
   */
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(setUser(null))
  }

  const renderLogout = () => {
    return (
      <div className="logout">
        <p><strong>{user.name}</strong> is logged in</p>
        <button className="button is-warning is-light is-small" onClick={handleLogout}>Logout</button>
      </div>
    )
  }
  return (
    <div id="blog-page">
      <Navigation />
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
        <Route path="/blogs/:id">
          <Blog blog={blogSelected} />
        </Route>
        <Route path="/">
          <BlogList />
        </Route>
      </Switch>
      {renderLogout()}
    </div>
  )
}

export default BlogPage
