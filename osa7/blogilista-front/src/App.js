import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import { publishMessage, wipeMessage } from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import { addBlog, setBlogs } from './reducers/blogsReducer'
import usersService from './services/users'
import User from './components/User'
import { BrowserRouter, Route, Link, Redirect, withRouter } from 'react-router-dom'
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'

const reduuseri = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer
})

const Store = createStore(reduuseri)

const App = () => {
  const [username] = useField('text')
  const [password] = useField('password')
  // const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  /*
  const [notification, setNotification] = useState({
    message: null
  })
  */

  useEffect(() => {
    blogService.getAll().then(blogs => {
      Store.dispatch(setBlogs(blogs))
    })
    /*
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
    */
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    usersService.getAll().then(u => {
      setUsers(u)
    })
  }, [])

  const notify = (message, type = 'success') => {
    Store.dispatch(publishMessage(message))
    setTimeout(() => Store.dispatch(wipeMessage()), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      notify('wrong username of password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const createBlog = async (blog) => {
    const createdBlog = await blogService.create(blog)
    newBlogRef.current.toggleVisibility()
    // lisäys menee kantaan mutta sitten tapahtuu jotain...?
    Store.dispatch(addBlog(createBlog))

    // const blogs = Store.getState().blogs
    // Store.dispatch(setBlogs(blogs.concat(createdBlog)))
    
    // tämä on Reduxia edeltävältä ajalta, eli alkuperäinen...
    // setBlogs(blogs.concat(createdBlog))
    notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
  }

  const likeBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1}
    const updatedBlog = await blogService.update(likedBlog)
    const blogs = Store.getState().blogs
    const updatedBlogs = blogs.map(b => b.id === blog.id ? updatedBlog : b)
    Store.dispatch(setBlogs(updatedBlogs))
    // setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
    notify(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
  }

  const removeBlog = async (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      const updatedBlog = await blogService.remove(blog)
      const blogs = Store.getState().blogs
      const updatedBlogs = blogs.filter(b => b.id !== blog.id)
      Store.dispatch(setBlogs(updatedBlogs))
      // setBlogs(blogs.filter(b => b.id !== blog.id))
      notify(`blog ${updatedBlog.title} by ${updatedBlog.author} removed!`)
    }
  }
  
  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={Store.getState().notification} />

        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input {...username}/>
          </div>
          <div>
            salasana
            <input {...password} />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }

  const newBlogRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <BrowserRouter>
        <div>
          <table><tbody><tr>
            <th><Link to="/">Blogs</Link></th>
            <th><Link to="/users">Users</Link></th>
            <th>{user.name} logged in <button onClick={handleLogout}>logout</button></th>
            </tr></tbody></table>
          <h2>Blogs App</h2>
          <Notification notification={Store.getState().notification} />
          <Route exact path="/" render={() =>
            <div>
              <Togglable buttonLabel='create new' ref={newBlogRef}>
                <NewBlog createBlog={createBlog} />
              </Togglable>

              {Store.getState().blogs.sort(byLikes).map(blog =>
                <div>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </div>
              )}
            </div>
          } />
          <Route exact path="/users" render={() =>
            <div>
              <h2>Users</h2>
              <ul>
              {users.map(user => 
                <li key={user.id}>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>, {user.blogs.length} blogs created
                </li>
              )}
              </ul>
            </div>} />
          <Route exact path="/users/:id" render={({ match }) =>
            <UserDetails user={users.find(u => u.id === match.params.id)} />
          }/>
          <Route exact path="/blogs/:id" render={({ match }) =>
            <BlogDetails
              blog={Store.getState().blogs.find(b => b.id === match.params.id)}
              like={likeBlog}
              remove={removeBlog}
              user={user}
              creator={Store.getState().blogs.find(b => b.id === match.params.id).user.username === user.username}
              />
          }/>
        </div>
      </BrowserRouter>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
Store.subscribe(renderApp)

export default App