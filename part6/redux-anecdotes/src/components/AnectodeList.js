import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

/**
 * Anecodte React Component
 * Consists of the anecdote content, number of votes and a vote button
 */
const Anecdote = (props) => {
  const {id, votes, content, voteDispatch, notificationDispatch } = props;
  const vote = (id) => {
    voteDispatch(id, { votes: votes + 1})
    notificationDispatch(`Voted for ${content}`, 5)
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

/**
 * AnecdoteList React component
 * Consists of a list of Anecdote components
 */
const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes.filter((anecdote) => anecdote.content.includes(props.filter))

  const sortedByVotesAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  const anecdotesRender = sortedByVotesAnecdotes.map((anecdote) => <Anecdote voteDispatch={props.voteFor} notificationDispatch={props.newNotification} key={anecdote.id} content={anecdote.content} id={anecdote.id} votes={anecdote.votes} />)
  
  return (
    <div id="anecdote-list">
      {anecdotesRender}
    </div>
  )
}

const mapDispatchToProps  = {
    voteFor,
    newNotification,
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList 