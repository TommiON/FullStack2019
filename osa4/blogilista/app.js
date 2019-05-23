// const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

app.use(cors())

console.log('portti: ', config.port)
console.log('kanta: ', config.mongoURL)

mongoose.connect(config.mongoURL, { useNewUrlParser: true })
console.log('yhteys muodostettu: ', config.mongoURL)

module.exports = app