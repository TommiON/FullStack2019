const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const bodyParser = require('body-parser')
blogsRouter.use(bodyParser.json())

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
}

blogsRouter.post('/', async (request, response) => {
    if(request.body.title === undefined && request.body.url === undefined) {
        response.status(400).send(null)
        return
    }

    const token = getTokenFrom(request)

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token puuttuu tai on virheellinen' })
        }

        const user = await User.findById(decodedToken.id)
        
        const blog = new Blog(request.body)
        blog.user = user.id
        const updatedUser = {
            username: user.username,
            name: user.name,
            passwordHash: user.passwordHash,
            blogs: user.blogs.concat(blog)
        }
        await User.findByIdAndUpdate(user.id, updatedUser, {new: true})

        if(!request.body.likes) {
            blog.likes = 0
        }
        
        await blog.save()
        response.status(201).json(blog)
      
    } catch(exception) {
        console.log(exception)
    }

    /* väliaikainen purkkaratkaisu, otetaan tietokannasta eka
    const users = await User.find({})
    const firstUser = users[0]
    blog.user = firstUser.id
    const updatedUser = {
        username: firstUser.username,
        name: firstUser.name,
        passwordHash: firstUser.passwordHash,
        blogs: firstUser.blogs.concat(blog)
    }
    await User.findByIdAndUpdate(firstUser.id, updatedUser, {new: true})

    if(!request.body.likes) {
      blog.likes = 0
    }
  
    await blog.save()
    response.status(201).json(blog)
    */
})

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    const blogToBeDeleted = await Blog.findById(id)

    const token = getTokenFrom(request)
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token puuttuu tai on virheellinen' })
        }
        const user = await User.findById(decodedToken.id)
        if(blogToBeDeleted.user.toString() === user.id.toString()) {
            await Blog.findByIdAndRemove(id)
            response.status(204).end()
        } else {
            response.status(400).json({ error: 'vain blogin lisääjä saa poistaa bloginsa'})
        }
    } catch(exception) {
        console.log(exception)
    }
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