import anecdoteService from '../services/anecdoteService'

const initialState = []

/**
 * Redux anecdote reducer
 */
const anecdoteReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find((elem) => elem.id === id)
      const newAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1 
      }

      return state.map((anecdote) => anecdote.id === id ? newAnecdote : anecdote)
    case 'NEW_ANECDOTE': 
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default: 
      return state
  }
}

/**
 * Increases the vote count by 1 for the id specified
 * Calls the modify service for db access
 */
export const voteFor = (id, modification) => {
  return async dispatch => {
    const response = await anecdoteService.modify(id, modification)
    dispatch({
      type: 'VOTE',
      data: response
    })
  }
}

/**
 * Adds a new anecdote 
 * Calls the createNew anecdote service for db access
 */
export const addNew = (anecdote) => {
  return async dispatch => {
    const response = await anecdoteService.createNew(anecdote)
    dispatch ({
      type: 'NEW_ANECDOTE',
      data: response
    })
  }
}

/**
 * Initializes the anecdotes by using anecdote service to get anecdotes stored in db
 */
export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch ({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer