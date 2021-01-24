import axios from 'axios'
const baseUrl = '/api/todos'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newTodo => {
    const request = axios.post(baseUrl, newTodo)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response=>response.data)
}

const update = (id, updatedTodo) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedTodo)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }