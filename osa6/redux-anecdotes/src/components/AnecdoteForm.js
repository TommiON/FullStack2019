import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { publishMessage, resetMessage } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const add = (event) => {
        event.preventDefault()
        const anekdootti = event.target.anekdootti.value
        props.addAnecdote(anekdootti)
        // const action = addAnecdote(anekdootti)
        // props.store.dispatch(action)

        const message = 'New anecdote added'
        props.publishMessage(message)
        // props.store.dispatch(publishMessage(message))
        setTimeout(() => props.resetMessage(), 5000)
        // setTimeout(() => props.store.dispatch(resetMessage()), 5000)
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

const mapDispatchToProps = {
    addAnecdote,
    publishMessage,
    resetMessage,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm