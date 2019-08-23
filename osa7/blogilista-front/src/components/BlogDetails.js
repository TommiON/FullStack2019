import React from 'react'
import NewComment from './NewComment'

const BlogDetails = ({ blog, like, remove, creator, store }) => {
    if(blog === undefined) {
        return null
    }
    return(
        <div>
        <h3> {blog.title} </h3>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes
        <button onClick={() => like(blog)}>like</button>
        </div>
        <div>added by {blog.user.name} {creator &&(<button onClick={() => remove(blog)}>remove </button>)} </div>
        <h4>Comments</h4>
        <ul>
        {blog.comments.map(c => <li key={c}>{c}</li>)}
        </ul>
        <NewComment blogId={blog.id} store={store} />
        </div>
    )   
}

export default BlogDetails