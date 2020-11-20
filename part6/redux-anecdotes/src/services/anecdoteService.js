import axios from 'axios'

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (newEntry) => {
  const newObject = {content: newEntry, votes: 0}
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { getAll, createNew }