import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { publishMessage, resetMessage } from '../reducers/notificationReducer'
import AnecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const add = async (event) => {
        event.preventDefault()
        const anekdootti = event.target.anekdootti.value
        const addedAnecdote = props.addAnecdote(anekdootti)
        const toBeAdded = {
            'content': addedAnecdote.data.content,
            'id': addedAnecdote.data.id,
            'votes': addedAnecdote.data.votes,
        }
        console.log('to be added: ', toBeAdded)
        await AnecdoteService.createNew(toBeAdded)
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