import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initialize } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdoteService'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnectodeList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => {
      dispatch(initialize(anecdotes))
    })
  }, [dispatch])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
      
  )
}

export default App