import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'



const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(0)

  const handleNextClick = () => {
    const randAnecdote = Math.floor(Math.random()*anecdotes.length);
    setSelected(randAnecdote)
  }

  const handleVoteClick = () => {
    anecdotes[selected].votes += 1
    
    setVotes(anecdotes[selected].votes)
  }

  const topAnecdote = anecdotes[0]
  anecdotes.forEach((element) => {
    if (element.votes > topAnecdote.votes) {
      Object.assign(topAnecdote, element)
    }
  })

  return (
    <div id="main">
      <h1>Anecdotes</h1>
      <p>{props.anecdotes[selected].anecdote}</p>
      <p>({props.anecdotes[selected].votes})</p>
      <button onClick={handleNextClick}>Next Anecdote</button>
      <button onClick={handleVoteClick}>Vote</button>

      <h1>Top Anecdote</h1>
      <p>{topAnecdote.anecdote}</p>
      <p>{(topAnecdote.votes)}</p>
    </div>
  )
}

const anecdotes = [
  {
    anecdote: 'If it hurts, do it more often',
    votes: 0
  },
  {
    anecdote: 'Adding manpower to a late software project makes it later!',
    votes: 0
  },

  {
    anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0
  },

  {
    anecdote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0
  },

  {
    anecdote: 'Premature optimization is the root of all evil.',
    votes: 0
  },
  {
    anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0
  },
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)