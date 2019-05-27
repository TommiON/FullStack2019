// const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request = {...request, token: authorization.substring(7) }
    }
    next()
}
app.use(tokenExtractor)

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

const usersRouter = require('./controllers/users')
app.use('/api/users', usersRouter)

const loginRouter = require('./controllers/login')
app.use('/api/login', loginRouter)

app.use(cors())

console.log('portti: ', config.port)
console.log('kanta: ', config.mongoURL)

mongoose.connect(config.mongoURL, { useNewUrlParser: true })
console.log('yhteys muodostettu: ', config.mongoURL)

module.exports = app