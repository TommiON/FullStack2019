import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { publishMessage, resetMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    
    const anecdotes = props.store.getState().anecdotes
    var filteredAnecdotes = anecdotes
    if( props.store.getState().filter !== '') {
        filteredAnecdotes = anecdotes.filter(a => a.content.includes(props.store.getState().filter))
    }

    const vote = (id) => {
        props.store.dispatch(voteFor(id))
        const votedAnecdote = anecdotes.find(a => a.id === id)
        const message = 'Voted for "' + votedAnecdote.content + '"'
        props.store.dispatch(publishMessage(message))
        setTimeout(() => props.store.dispatch(resetMessage()), 5000)
    }

    return(
        <div>
            {filteredAnecdotes
                .sort((a,b) => a.votes < b.votes ? 1 : -1)
                .map(anecdote =>
                    <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                    </div>
            )}
        </div>
    )
}

export default AnecdoteList