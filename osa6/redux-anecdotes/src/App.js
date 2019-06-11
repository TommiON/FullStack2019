import React from 'react';
import { voteFor, addAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
  const anecdotes = props.store.getState()
  
  const vote = (id) => {
    props.store.dispatch(voteFor(id))
  }

  const add = (event) => {
    event.preventDefault()
    const anekdootti = event.target.anekdootti.value
    props.store.dispatch(addAnecdote(anekdootti))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="anekdootti"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
