// const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

app.use(cors())

const mongoUrl = 'mongodb://127.0.0.1:27017/osa4'
mongoose.connect(mongoUrl, { useNewUrlParser: true })
console.log('yhteys muodostettu: ', mongoUrl)

module.exports = app