import loginService from '../services/loginService'
import blogService from '../services/blogService'


const initialState = null

/**
 * Redux user reducer
 */
const userReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

/**
 * Logs in a new user and sets them as the user
 */
export const login = (credentials) => {
  return async dispatch => {
    const response = await loginService.login(credentials)
    blogService.setToken(response.token)
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(response))

    dispatch ({
      type: 'LOGIN',
      data: response
    })
  }
}

/**
 * Sets a new user
 */
export const setUser = (user) => {
  if ( user === null) {
    window.localStorage.removeItem('loggedBlogUser')
  } else {
    blogService.setToken(user.token)
  }

  return {
    type: 'SET_USER',
    data: user
  }
}



export default userReducer