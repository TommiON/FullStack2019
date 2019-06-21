import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (newAnecdote) => {
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const updateVotes = async (id) => {
    const url = `http://localhost:3001/anecdotes/${id}`
    const toBeUpdated = await axios.get(url)
    const updated = {
        'content': toBeUpdated.data.content,
        'id': toBeUpdated.data.id,
        'votes': toBeUpdated.data.votes+1
    }
    const response = await axios.put(url, updated)
    return response.data
}

export default { getAll, createNew, updateVotes }