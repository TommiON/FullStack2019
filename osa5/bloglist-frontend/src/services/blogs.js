
import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log('blogservice setToken: ',`bearer ${newToken}`)
  console.log(token)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

/*
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
*/

const addNew = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('config: ', config)

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const replace = async (id, freshBlog) => {
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url, freshBlog)
  return response.data
}

const remove = async id => {
  const url = `${baseUrl}/${id}`
  const config = {
    headers: { Authorization: token },
  }
  console.log('poiston config: ', config)
  console.log('poiston URL: ', url)
  const response = await axios.delete(url, config)
  console.log('Axios response: ', response)
  return response.data
}

export default { getAll, addNew, replace, remove, setToken }