import React from 'react'
import { useDispatch } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'
import { newNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createClicked = async (event) => {
    event.preventDefault();
    
    const input = event.target['newInput'].value

    if (input && input.length > 0) {
      dispatch(addNew(input))
      dispatch(newNotification(`Created new anecdote: ${input}`))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }

  return (
    <div id="create-new">
      <h2>create new</h2>
      <form onSubmit={createClicked}>
        <div><input name="newInput" /></div>
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm