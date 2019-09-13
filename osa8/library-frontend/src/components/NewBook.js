import React from 'react'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import NewBookForm from './NewBookForm'
import { onError } from 'apollo-link-error'

const NewBook = (props) => {

  const CREATE_BOOK = gql`
    mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]) {
      addBook(
        title: $title,
        published: $published,
        author: $author,
        genres: $genres,
      ) {
        title,
        author {
          name
        },
        published,
        genres
      }
    }
  `

  return (
    <Mutation mutation={CREATE_BOOK} >
      {(addBook) =>
        <NewBookForm show={props.show} addBook={addBook} />
      }
    </Mutation>
  )
}

export default NewBook