import React from 'react'
import { useField } from '../hooks'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogsReducer'

const NewComment = ({ blogId, store }) => {
    const [content, contentReset] = useField('text')

    const handleSubmit =  async (event) => {
        event.preventDefault()
        const updatedBlog = await blogService.postComment(blogId, {comment: content.value})
        const blogs = store.getState().blogs
        const updatedBlogs = blogs.map(b => b.id === blogId ? updatedBlog : b)
        store.dispatch(setBlogs(updatedBlogs))
        contentReset()
      }

    return (
        <div>
          <h4>Post a comment</h4>
          <form onSubmit={handleSubmit}>
            <div>
              title:
              <input {...content} />
            </div>
            <button type='submit'>send</button>
          </form>
        </div>
      )
}

export default NewComment