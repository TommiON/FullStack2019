import React, { useState, useEffect } from 'react'
import ApolloClient, { gql } from 'apollo-boost'

const GenreFilter = (props) => {
    const [books, setBooks] = useState([])
    const [genres, setGenres] = useState([])

    useEffect(() => {
        const ALL_BOOKS = gql`
            {
                allBooks{
                    genres
            }
        }
        `

        const client = new ApolloClient({
            uri: 'http://localhost:4000/graphql'
        })

        client.query({ query: ALL_BOOKS })
            .then(response => setBooks(response.data.allBooks))
    }, [])

    books.map(book => {
        book.genres.map(genre => {
            if(!genres.includes(genre)) {
                setGenres(genres.concat(genre))
            }
        })
    })

    const changeGenre = (genre) => {
        if(genre === 'all') {
            return props.setFilter('')
        }
        return props.setFilter(genre)
    }
    
    return(
        <div>
            <h4>Filter by genre</h4>
            {genres.map(g => <button key={g} onClick={() => changeGenre(g)}>{g}</button>)}
            <button onClick={() => changeGenre('all')}>All genres</button>
        </div>
    )
}

export default GenreFilter