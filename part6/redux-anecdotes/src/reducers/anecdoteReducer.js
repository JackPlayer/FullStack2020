import anecdoteService from '../services/anecdoteService'

const asObject = (anecdote) => {
  return {
    content: anecdote.content,
    id: anecdote.id,
    votes: 0
  }
}

const initialState = []

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

export const voteFor = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addNew = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: asObject(anecdote)
  }
}

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