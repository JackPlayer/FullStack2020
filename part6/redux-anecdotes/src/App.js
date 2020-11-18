import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor, addNew } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
  }

  const createClicked = (event) => {
    event.preventDefault();
    
    const input = event.target['newInput'].value

    if (input && input.length > 0) {
      dispatch(addNew(input))
    }
  }

  const sortedByVotesAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  console.log(sortedByVotesAnecdotes)
  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedByVotesAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createClicked}>
        <div><input name="newInput" /></div>
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default App