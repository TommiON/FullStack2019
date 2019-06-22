import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { publishMessage, resetMessage, setMessage } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const add = async (event) => {
        event.preventDefault()
        const anekdootti = event.target.anekdootti.value
        props.addAnecdote(anekdootti)
        
        const message = 'New anecdote added'
        props.setMessage(message, 3)
        
        // props.publishMessage(message)
        // setTimeout(() => props.resetMessage(), 5000)
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
    setMessage,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm