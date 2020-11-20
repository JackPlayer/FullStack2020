import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { newNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({content, votes, id}) => {
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
    dispatch(newNotification(`Voted for ${content}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <div>
        {content}
      </div>
      <div>
        has {votes}
        <button onClick={() => vote(id)}>vote</button>
      </div>
    </div>
  )
}
const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)

  const sortedByVotesAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  const anecdotesRender = sortedByVotesAnecdotes.map((anecdote) => <Anecdote key={anecdote.id} content={anecdote.content} id={anecdote.id} votes={anecdote.votes} />)
  
  return (
    <div id="anecdote-list">
      {anecdotesRender}
    </div>
  )
}

export default AnecdoteList