import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { publishMessage, resetMessage } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const add = (event) => {
        event.preventDefault()
        const anekdootti = event.target.anekdootti.value
        const action = addAnecdote(anekdootti)
        props.store.dispatch(action)

        const message = 'New anecdote added'
        props.store.dispatch(publishMessage(message))
        setTimeout(() => props.store.dispatch(resetMessage()), 5000)
    }
    
    return(
        <div>
        <h2>create new</h2>
        <form onSubmit={add}>
            <div><input name="anekdootti"/></div>
            <button type="submit">create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm