import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const getAll = () => {
    const request = axios.get(baseUrl)
    const response = request.then(res => res.data)
    return response
}

export default { getAll }