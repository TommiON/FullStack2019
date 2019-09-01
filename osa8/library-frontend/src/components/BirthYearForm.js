import React, { useState, useEffect } from 'react'
import ApolloClient, { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'

const BirthYearForm = (props) => {
    const[name, setName] = useState('')
    const[born, setBirthYear] = useState('')
    const[authors, setAuthors] = useState([])
    
    const submit = async (e) => {
        e.preventDefault()
        await props.editYear({
            variables: { name: name, setBornTo: born }
        })
        setName('')
        setBirthYear('')
    }

    useEffect(() => {
        const ALL_AUTHORS = gql`
        {
            allAuthors{
                name
            }
        }
        `

        const client = new ApolloClient({
            uri: 'http://localhost:4000/graphql'
        })

        client.query({ query: ALL_AUTHORS })
            .then(response => setAuthors(response.data.allAuthors))
    }, [])
    
    const changeSelected = (event) => {
        setName(event.target.value)
    }
    
    return(
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={changeSelected}>
                    <label>
                        Choose author: 
                        <select value={name} onChange={changeSelected}>
                            <option>-- Select --</option>
                            {authors.map(a =>
                                <option key={a.name}>{a.name}</option>
                            )}
                        </select>
                    </label>
            </form>
            
            <form onSubmit={submit}>
                <div>born
                <input value={born} onChange={({ target}) => setBirthYear(target.value)} />
                </div>
                <button type='submit'>Set year</button>
            </form>
        </div>
    )
}

export default BirthYearForm