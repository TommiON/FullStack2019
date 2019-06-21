import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import AnecdoteService from './services/anecdotes'
import {initializeAnecdotes} from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    AnecdoteService
    .getAll()
    .then(anecdotes => props.initializeAnecdotes(anecdotes))
  }, [])



  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, {initializeAnecdotes})(App)
