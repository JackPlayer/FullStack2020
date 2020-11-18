import React from 'react'
import { useDispatch } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createClicked = (event) => {
    event.preventDefault();
    
    const input = event.target['newInput'].value

    if (input && input.length > 0) {
      dispatch(addNew(input))
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