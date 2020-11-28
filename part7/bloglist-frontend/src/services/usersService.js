/**
 * Users Service: Allows the front-end to query the server
 */
import axios from 'axios'
const baseUrl = '/api/users'


/**
 * Gets all the blogs from the server
 */
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


export default { getAll }