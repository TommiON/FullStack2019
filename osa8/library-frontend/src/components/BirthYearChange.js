import React from 'react'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import BirthYearForm from './BirthYearForm'

const BirthYearChange = () => {
    
    const EDIT_BIRTHYEAR = gql`
    mutation editBirthYear($name: String!, $setBornTo: Int!) {
      editAuthor(
        name: $name,
        setBornTo: $setBornTo)
      {
        name
        born
        bookCount
      }
    }
    `
    
    return(
        <Mutation mutation={EDIT_BIRTHYEAR}>
            {(editYear) => 
                <BirthYearForm editYear={editYear} />
            }
        </Mutation>
    )
}

export default BirthYearChange