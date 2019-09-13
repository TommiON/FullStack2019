import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken ] = useState(null)

  const client = useApolloClient()

  const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password)  {
        value
      }
    }
  `

  const handleError = (error) => {
    console.log('VIRHE: ', error)
  }

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    console.log('kirjauduttiin ulos')
  }

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm login={login} setToken={(token) => setToken(token)} />
        <hr></hr>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <Authors show={page === 'authors'} />
        <Books show={page === 'books'} />
        <NewBook show={page === 'add'} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>Kirjaudu ulos</button>
        <Authors show={page === 'authors'} />
        <Books show={page === 'books'} />
        <NewBook show={page === 'add'} />
      </div>

    </div>
  )
}

export default App