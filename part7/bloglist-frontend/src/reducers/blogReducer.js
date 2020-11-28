import blogService from '../services/blogService'

const initialState = []

/**
 * Redux anecdote reducer
 */
const blogReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'ALL_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'REMOVE_BLOG':
    return state.filter((entry) => entry.id !== action.data)
  default:
    return state
  }
}

/**
 * Adds a new blog
 * Calls the createNew blog service for db access
 */
export const addNewBlog = (blog) => {
  return async dispatch => {
    const response = await blogService.create(blog)
    dispatch ({
      type: 'NEW_BLOG',
      data: response
    })
  }
}

/**
 * Initializes the blogs by using blog service to get blogs stored in db
 */
export const remove = (id) => {
  return async dispatch => {
    await blogService.remove({ id, })
    dispatch ({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

/**
 * Initializes the blogs by using blog service to get blogs stored in db
 */
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch ({
      type: 'ALL_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer