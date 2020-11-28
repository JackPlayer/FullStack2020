import usersService from '../services/usersService'


const initialState = []

/**
 * Redux user reducer
 */
const usersReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

/**
 * Initializes the users by using users service to get users stored in db
 */
export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch ({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default usersReducer