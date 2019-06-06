import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlogForm from './components/AddBlogForm'
import TogglableForm from './components/TogglableForm'
import TogglableBlog from './components/TogglableBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [statusMessage, setStatusMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )

    const sorted = blogs.sort((a,b) => (a.likes > b.likes) ? 1 : ((b.likes > a.likes) ? -1 : 0))
    setBlogs(sorted)

    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password, 
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setStatusMessage(`Kirjattu sisään: ${user.name}`)
      setTimeout(() => {setStatusMessage(null)}, 3000)
    } catch(exception) {
      setStatusMessage(`Kirjautuminen ei onnistu, luultavasti väärä käyttäjätunnus tai salasana.`)
      setTimeout(() => {setStatusMessage(null)}, 3000)
      console.log('Jokin meni vikaan, ehkä väärä salasana. ', exception)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
  }

  const handleAdd = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    const response = await blogService.addNew(newBlog)
    setBlogs(blogs.concat(response))
    setStatusMessage(`Lisätty blogi ${title} jonka tekijä on ${author}`)
    setTitle('')
    setAuthor('')
    setUrl('')
    setTimeout(() => {setStatusMessage(null)}, 3000)
  }

  const handleLike = async (blog) => {
    console.log('Tykätty blogista: ', blog.id, blog.title)
    const newLikes = blog.likes + 1
    const updatedBlog = {...blog, likes: newLikes}
    await blogService.replace(blog.id, updatedBlog)
    const currentStuff = await blogService.getAll()
    const sorted = currentStuff.sort((a,b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0))
    setBlogs(sorted)
  }

  const handleDelete = async (id) => {
    if(window.confirm('Poistetaanko blogi?')) {
      await blogService.remove(id)
      const currentStuff = await blogService.getAll()
      setBlogs(currentStuff)
    }
  }

  const Notification = ({viesti}) => {
    const notificationStyle = {
      color: 'green',
      borderStyle: 'solid',
      background: "lightgrey",
      borderRadius: 5,
      marginBottom: 10,
      padding: 10
    }
    if(viesti === null) {
      return null
    }
    return(
      <div style={notificationStyle}>{viesti}</div>
    )
  }
  
  if(user === null) {
    return(
      <form onSubmit={handleLogin}>
        <div>
          Käyttäjätunnus:
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Salasana:
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    )
  }

  return (
    <div>
      <Notification viesti={statusMessage} />
      <p>{user.name} on kirjautuneena</p>
      <form onSubmit={handleLogout}> <button type="submit">Kirjaudu ulos</button></form>

      <h2>blogs</h2>
      
      <TogglableForm labelForShow="Lisää blogi" labelForHide="Peruuta blogin lisääminen">
        <AddBlogForm
          handleAdd={handleAdd}
          title={title}
          handleTitleChange={({target}) => setTitle(target.value)}
          author={author}
          handleAuthorChange={({target}) => setAuthor(target.value)}
          url={url}
          handleUrlChange={({target}) => setUrl(target.value)} />
      </TogglableForm>
      
      <p>Klikkaa blogin nimeä, näet tarkemmat tiedot!</p>

      {blogs.map(blog =>
        <TogglableBlog key={blog.id} labelText={blog.title}>
          <Blog key={blog.id} blog={blog} likingFunction={handleLike} deleteFunction={handleDelete} activeUser={user.username}/>
        </TogglableBlog>
      )}
    </div>
  )
}

export default App