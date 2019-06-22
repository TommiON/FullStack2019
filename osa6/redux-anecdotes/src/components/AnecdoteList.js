import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { publishMessage, resetMessage, setMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    
    const vote = async (id) => {
        props.voteFor(id)
        const votedAnecdote = props.visibleAnecdotes.find(a => a.id === id)

        const message = 'Voted for "' + votedAnecdote.content + '"'       
        props.setMessage(message, 3)

        // props.publishMessage(message)
        // setTimeout(() => props.resetMessage(), 5000)
    }

    return(
        <div>
            {props.visibleAnecdotes
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

const anecdotesToShow = ({ anecdotes, filter }) => {
    if(filter !== '') {
        const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        return filteredAnecdotes
    } else {
        return anecdotes
    }
}

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state),
    }
}

const mapDispatchToProps = {
    voteFor,
    publishMessage,
    resetMessage,
    setMessage
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList