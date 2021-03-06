import React, { useState } from 'react'

const NewBookForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    console.log('nyt yritetään lisätä...')
    console.log('genres: ', genres)
    await props.addBook({
        variables: { title, published, author, genres }
    })
    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
        <h2>Add new book</h2>
        <form onSubmit={submit}>
            <div>title
            <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            />
            </div>
            <div>
            author
            <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
            />
            </div>
            <div>
            published
            <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
            />
            </div>
            <div>
            <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
            />
            <button onClick={addGenre} type="button">add genre</button>
            </div>
            <div>
            genres: {genres.join(' ')}
            </div>
            <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBookForm