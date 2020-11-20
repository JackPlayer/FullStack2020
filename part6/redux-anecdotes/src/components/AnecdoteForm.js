import React from 'react'
import { connect } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const createClicked = async (event) => {
    event.preventDefault();
    
    const input = event.target['newInput'].value

    if (input && input.length > 0) {
      props.addNew(input)
      props.newNotification(`Created new anecdote: ${input}`, 5)
      event.target['newInput'].value = ""
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

const mapDispatchToProps = {
  addNew,
  newNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm