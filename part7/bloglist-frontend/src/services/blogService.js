/**
 * Blogs Service: Allows the front-end to query the server
 */
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

/**
 * Sets the token necessary for queries
 * @param {*} newToken New token to set
 */
const setToken = newToken => {
  token = `bearer ${newToken}`
}

/**
 * Gets all the blogs from the server
 */
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

/**
 * Queries the server to create a new blog entry
 * @param {*} newObject The blog object to create
 */
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

/**
 * Queries the server to update an existing object
 * @param {*} updatedObject The updated object (id should exist in the db already)
 */
const update = async updatedObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject, config)
  return response.data
}

/**
 * Removes the object from the server
 * @param {*} objectToDelete The object to delete (id should exist in the db already)
 */
const remove = async objectToDelete => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${objectToDelete.id}`, config)
  return response.data
}

export default { getAll, setToken, create, update, remove }