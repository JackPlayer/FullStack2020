import axios from 'axios'

const endpoint = "/api/persons"
const getAll = () => {
    const response = axios.get(endpoint)
    return response.then((response) => response.data )
}

const create = (newEntry) => {
    const response = axios.post(endpoint, newEntry)
    return response.then((response) => response.data)
}

const update = (id, updatedEntry) => {
    const response = axios.put(`${endpoint}/${id}`, updatedEntry)
    return response.then((response) => response.data)
}

const remove = (id) => {
    const response = axios.delete(`${endpoint}/${id}`)
    return response.then((response) => response.data)
}

export default {getAll, create, update, remove}