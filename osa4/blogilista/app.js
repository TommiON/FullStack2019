// const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
app.use(cors())

/*
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)
*/

const mongoUrl = 'mongodb://127.0.0.1:27017/osa4'
mongoose.connect(mongoUrl, { useNewUrlParser: true })
console.log('yhteys muodostettu: ', mongoUrl)

/*
app.use(bodyParser.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
*/

app.use('/api/blogs', blogsRouter)

module.exports = app