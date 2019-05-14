import axios from 'axios'

const getAll = () => {
    const request = axios.get('http://localhost:3001/persons')
    return request.then(response => response.data)
}

const getOne = personId => {
    const url = `http://localhost:3001/persons/${personId}`
    const request = axios.get(url)
    return request.then(response => response.data)
}

const add = newPerson => {
    const request = axios.post('http://localhost:3001/persons', newPerson)
    return request.then(response => response.data)
}

const remove = personId => {
    const url = `http://localhost:3001/persons/${personId}`
    const request = axios.delete(url)
    return request.then(response => response.data)
}

const replace = (personId, nimi, numero) => {
    const url = `http://localhost:3001/persons/${personId}`
    console.log('nyt ollaan Axios-funktiossa')
    console.log('id: ', personId, " nimi: ", nimi, " uusi numero: ", numero)
    const request = axios.put(url, 
        {
            name: nimi,
            number: numero,
            id: personId
        })
    return request.then(response => response.data)
}

export default {getAll, getOne, add, remove, replace}

