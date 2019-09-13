import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import ApolloClient from 'apollo-boost'

/*
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})
*/

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('tokeni')
  console.log('setContext, token: ', token)
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client} >
      <App />
    </ApolloProvider>, 
    document.getElementById('root')
)

// ReactDOM.render(<App />, document.getElementById('root'))