import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import GenreFilter from './GenreFilter'

const Books = (props) => {
  const [filter, setFilter] = useState('')

  if (!props.show) {
    return null
  }

  /*
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
  })
  */

  const ALL_BOOKS = gql`
  {
    allBooks{
      title
      published
      author{name}
      genres
    }
  }
  `

  /*
  client.query({ query: ALL_BOOKS })
    .then((response) => {
      console.log('kannasta löytyy: ', response.data)
  })
  */

  // const books = []

  return(
    <div>
    <Query query={ALL_BOOKS} pollInterval={2000}>
      {(result) =>{
        if(result.loading) {
          return <div>loading...</div>
        }
        return(
          <div>
          <h2>Books</h2>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>published</th>
                <th>author</th>
                <th>genres</th>
              </tr>
              {result.data.allBooks
                .filter(b => b.genres.includes(filter) || filter === '')
                .map(b => 
                  <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.published}</td>
                  <td>{b.author.name}</td>
                  <td>{b.genres}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
          </div>
        )
      }}
    </Query>
    <GenreFilter setFilter={setFilter} />
    </div>
  )
}

export default Books