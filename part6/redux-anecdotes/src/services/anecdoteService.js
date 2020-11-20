/**
 * Service for querying the database
 */

import axios from 'axios'

const baseUrl = "http://localhost:3001/anecdotes"

/**
 * Get all anecdote entries inthe DB
 */
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

/**
 * Create a new anecdote entry in the db
 */
const createNew = async (newEntry) => {
  const newObject = {content: newEntry, votes: 0}
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

/**
 * Modify the entry 
 */
const modify = async (id, change) => {
  const response = await axios.patch(`${baseUrl}/${id}`, change)
  return response.data
}

export default { getAll, createNew, modify }