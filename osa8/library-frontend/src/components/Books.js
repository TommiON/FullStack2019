import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const Books = (props) => {
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
              </tr>
              {result.data.allBooks.map(b =>
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.published}</td>
                  <td>{b.author.name}</td>
                </tr>
                )}
            </tbody>
          </table>
          </div>
        )
      }}
    </Query>
  )
}

export default Books