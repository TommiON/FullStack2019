const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const bodyParser = require('body-parser')
blogsRouter.use(bodyParser.json())

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    if(request.body.title === undefined && request.body.url === undefined) {
        response.status(400).send(null)
        return
    }

    const blog = new Blog(request.body)
    
    if(!request.body.likes) {
      blog.likes = 0
    }
  
    await blog.save()
    response.status(201).json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }
    await Blog.findByIdAndUpdate(id, blog, {new: true})
    response.status(200).json(blog)
})

module.exports = blogsRouter