import React from 'react'

const BlogDetails = ({ blog, like, remove, creator }) => {
    if(blog === undefined) {
        return null
    }
    return(
        <div>
        <h3>{blog.title}</h3>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes
        <button onClick={() => like(blog)}>like</button>
        </div>
        <div>added by {blog.user.name} {creator &&(<button onClick={() => remove(blog)}>remove </button>)} </div>
        </div>
    )   
}

export default BlogDetails