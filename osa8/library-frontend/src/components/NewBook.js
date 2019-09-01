import React, { useState } from 'react'
import ApolloClient, { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import NewBookForm from './NewBookForm'

const NewBook = (props) => {

  const CREATE_BOOK = gql`
    mutation createBook($title: String!, $published: String!, $author: String!, $genres: [String!]) {
      addBook(
        title: $title,
        published: $published,
        author: $author,
        genres: $genres,
      ) {
        title
        published
        author
        genres
      }
    }
  `

  return (
    <Mutation mutation={CREATE_BOOK}>
      {(addBook) =>
        <NewBookForm show={props.show} addBook={addBook} />
      }
    </Mutation>
  )
}

export default NewBook