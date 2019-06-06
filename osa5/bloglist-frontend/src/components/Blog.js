import React from 'react'

const Blog = ({ blog, likingFunction, deleteFunction, activeUser }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addedByThisUser = (blog.user.username === activeUser)
  const removeButtonDisplay = { display: addedByThisUser ? '' : 'none' }

  return(
    <div style={blogStyle}>
    {blog.author}
    <br></br>
    <a href={blog.url}>{blog.url}</a>
    <p>{blog.likes} tykkäystä <button onClick={() => likingFunction(blog)}>Tykkää</button></p>
    <p>Lisännyt: {blog.user.name} </p>
    <button style={removeButtonDisplay} onClick={() => deleteFunction(blog.id)}>Poista</button>
    </div>
  )
}

export default Blog